import express from "express";
import { supabase } from "../index.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching projects", error });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({ message: "Project not found", error });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new project
router.post(
  "/",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { title, description, goal, deadline, category, status } = req.body;

      const { data: project, error } = await supabase
        .from("projects")
        .insert([
          {
            title,
            description,
            goal,
            raised: 0,
            deadline,
            status,
            category,
            created_by: req.user.id,
            branch_id: req.user.branch_id,
          },
        ])
        .select()
        .single();

      if (error) {
        return res
          .status(500)
          .json({ message: "Error creating project", error });
      }

      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Update a project
router.put(
  "/:id",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, goal, raised, deadline, status, category } =
        req.body;

      // Check if project exists and user has permission
      const { data: existingProject, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        return res
          .status(404)
          .json({ message: "Project not found", error: fetchError });
      }

      // Admin can edit any project, branch coordinator can only edit their own branch's projects
      if (
        req.user.role === "branch" &&
        existingProject.branch_id !== req.user.branch_id
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to edit this project" });
      }

      const { data: updatedProject, error } = await supabase
        .from("projects")
        .update({
          title,
          description,
          goal,
          raised,
          deadline,
          status,
          category,
          updated_at: new Date(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res
          .status(500)
          .json({ message: "Error updating project", error });
      }

      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

// Delete a project
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("branch", "admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if project exists and user has permission
      const { data: existingProject, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        return res
          .status(404)
          .json({ message: "Project not found", error: fetchError });
      }

      // Admin can delete any project, branch coordinator can only delete their own branch's projects
      if (
        req.user.role === "branch" &&
        existingProject.branch_id !== req.user.branch_id
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this project" });
      }

      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) {
        return res
          .status(500)
          .json({ message: "Error deleting project", error });
      }

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
);

export default router;
