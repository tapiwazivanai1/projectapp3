import express from "express";
import { supabase } from "../index.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Get all branches
router.get("/", authenticate, async (req, res) => {
  try {
    const { data: branches, error } = await supabase
      .from("branches")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching branches", error });
    }

    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get branch by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: branch, error } = await supabase
      .from("branches")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({ message: "Branch not found", error });
    }

    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new branch
router.post("/", authenticate, authorizeRoles("admin"), async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const { data: branch, error } = await supabase
      .from("branches")
      .insert([{ name, location, description }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "Error creating branch", error });
    }

    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a branch
router.put("/:id", authenticate, authorizeRoles("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, status } = req.body;

    const { data: branch, error } = await supabase
      .from("branches")
      .update({ name, location, description, status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: "Error updating branch", error });
    }

    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get branch members
router.get(
  "/:id/members",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user has permission to view this branch's members
      if (req.user.role === "branch" && req.user.branch_id !== id) {
        return res
          .status(403)
          .json({ message: "Not authorized to view members of this branch" });
      }

      const { data: members, error } = await supabase
        .from("users")
        .select("id, user_name, email, role, created_at, status")
        .eq("branch_id", id);

      if (error) {
        return res
          .status(500)
          .json({ message: "Error fetching branch members", error });
      }

      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Get branch statistics
router.get(
  "/:id/stats",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user has permission to view this branch's stats
      if (req.user.role === "branch" && req.user.branch_id !== id) {
        return res
          .status(403)
          .json({ message: "Not authorized to view stats of this branch" });
      }

      // Get member count
      const { count: memberCount, error: memberError } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("branch_id", id);

      if (memberError) {
        return res
          .status(500)
          .json({ message: "Error fetching member count", error: memberError });
      }

      // Get active projects count
      const { count: activeProjects, error: projectError } = await supabase
        .from("projects")
        .select("id", { count: "exact", head: true })
        .eq("branch_id", id)
        .eq("status", "active");

      if (projectError) {
        return res
          .status(500)
          .json({
            message: "Error fetching project count",
            error: projectError,
          });
      }

      // Get total contributions
      const { data: contributionsData, error: contributionError } =
        await supabase.from("projects").select("raised").eq("branch_id", id);

      if (contributionError) {
        return res
          .status(500)
          .json({
            message: "Error fetching contributions",
            error: contributionError,
          });
      }

      const totalContributions = contributionsData.reduce(
        (sum, project) => sum + project.raised,
        0,
      );

      // Get pending magazine submissions
      const { count: pendingSubmissions, error: submissionError } =
        await supabase
          .from("magazine_submissions")
          .select("id", { count: "exact", head: true })
          .eq("branch_id", id)
          .eq("status", "pending");

      if (submissionError) {
        return res
          .status(500)
          .json({
            message: "Error fetching submissions",
            error: submissionError,
          });
      }

      res.json({
        memberCount,
        activeProjects,
        totalContributions,
        pendingSubmissions,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

export default router;
