import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { supabase } from "../index.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/magazine";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and PDF are allowed."));
    }
  },
});

// Get all submissions
router.get("/submissions", authenticate, async (req, res) => {
  try {
    let query = supabase.from("magazine_submissions").select(`
        *,
        users:user_id (id, user_name, email),
        branches:branch_id (id, name)
      `);

    // Filter by branch for branch coordinators
    if (req.user.role === "branch") {
      query = query.eq("branch_id", req.user.branch_id);
    }
    // Individual users can only see their own submissions
    else if (req.user.role === "individual") {
      query = query.eq("user_id", req.user.id);
    }

    const { data: submissions, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching submissions", error });
    }

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get submission by ID
router.get("/submissions/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: submission, error } = await supabase
      .from("magazine_submissions")
      .select(
        `
        *,
        users:user_id (id, user_name, email),
        branches:branch_id (id, name)
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({ message: "Submission not found", error });
    }

    // Check if user has permission to view this submission
    if (req.user.role === "individual" && submission.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this submission" });
    }

    if (
      req.user.role === "branch" &&
      submission.branch_id !== req.user.branch_id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this submission" });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new submission
router.post(
  "/submissions",
  authenticate,
  upload.array("attachments", 5),
  async (req, res) => {
    try {
      const { title, contentType, content, authorName, branchId } = req.body;
      const files = req.files;

      // Process file uploads
      const attachments = files
        ? files.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
          }))
        : [];

      // Create submission in database
      const { data: submission, error } = await supabase
        .from("magazine_submissions")
        .insert([
          {
            title,
            content_type: contentType,
            content,
            author_name: authorName,
            branch_id: branchId,
            user_id: req.user.id,
            status: "pending",
            attachments: attachments.length > 0 ? attachments : null,
          },
        ])
        .select()
        .single();

      if (error) {
        return res
          .status(500)
          .json({ message: "Error creating submission", error });
      }

      // Create notification for branch coordinator
      if (branchId) {
        const { data: branchCoordinators } = await supabase
          .from("users")
          .select("id")
          .eq("role", "branch")
          .eq("branch_id", branchId);

        if (branchCoordinators && branchCoordinators.length > 0) {
          await Promise.all(
            branchCoordinators.map((coordinator) => {
              return supabase.from("notifications").insert([
                {
                  user_id: coordinator.id,
                  title: "New Magazine Submission",
                  message: `${authorName} has submitted "${title}" for review.`,
                  type: "magazine",
                  read: false,
                },
              ]);
            }),
          );
        }
      }

      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Update submission status
router.put(
  "/submissions/:id/status",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, feedback } = req.body;

      // Check if submission exists
      const { data: existingSubmission, error: fetchError } = await supabase
        .from("magazine_submissions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        return res
          .status(404)
          .json({ message: "Submission not found", error: fetchError });
      }

      // Branch coordinators can only update submissions from their branch
      if (
        req.user.role === "branch" &&
        existingSubmission.branch_id !== req.user.branch_id
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this submission" });
      }

      // Update submission status
      const { data: updatedSubmission, error } = await supabase
        .from("magazine_submissions")
        .update({
          status,
          feedback,
          reviewed_by: req.user.id,
          reviewed_at: new Date(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res
          .status(500)
          .json({ message: "Error updating submission", error });
      }

      // Create notification for the submitter
      await supabase.from("notifications").insert([
        {
          user_id: existingSubmission.user_id,
          title: "Magazine Submission Update",
          message:
            status === "approved"
              ? `Your submission "${existingSubmission.title}" has been approved.`
              : `Your submission "${existingSubmission.title}" needs revision.`,
          type: "magazine",
          read: false,
        },
      ]);

      res.json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Get magazine sections (for organization)
router.get(
  "/sections",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { data: sections, error } = await supabase
        .from("magazine_sections")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        return res
          .status(500)
          .json({ message: "Error fetching sections", error });
      }

      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Create a new magazine section
router.post(
  "/sections",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { title, description, order } = req.body;

      const { data: section, error } = await supabase
        .from("magazine_sections")
        .insert([{ title, description, order }])
        .select()
        .single();

      if (error) {
        return res
          .status(500)
          .json({ message: "Error creating section", error });
      }

      res.status(201).json(section);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

export default router;
