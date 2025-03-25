import express from "express";
import { supabase } from "../index.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Get all contributions for a user
router.get("/user", authenticate, async (req, res) => {
  try {
    const { data: contributions, error } = await supabase
      .from("contributions")
      .select(
        `
        *,
        projects:project_id (*)
      `,
      )
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching contributions", error });
    }

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all contributions for a project
router.get("/project/:projectId", authenticate, async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data: contributions, error } = await supabase
      .from("contributions")
      .select(
        `
        *,
        users:user_id (id, user_name, email)
      `,
      )
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching contributions", error });
    }

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create a new contribution
router.post("/", authenticate, async (req, res) => {
  try {
    const { projectId, amount, paymentMethod } = req.body;

    // Start a transaction
    const { data: contribution, error: contributionError } = await supabase
      .from("contributions")
      .insert([
        {
          user_id: req.user.id,
          project_id: projectId,
          amount,
          payment_method: paymentMethod,
        },
      ])
      .select()
      .single();

    if (contributionError) {
      return res
        .status(500)
        .json({
          message: "Error creating contribution",
          error: contributionError,
        });
    }

    // Update project raised amount
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("raised")
      .eq("id", projectId)
      .single();

    if (projectError) {
      return res
        .status(500)
        .json({ message: "Error fetching project", error: projectError });
    }

    const newRaisedAmount = project.raised + amount;

    const { error: updateError } = await supabase
      .from("projects")
      .update({ raised: newRaisedAmount })
      .eq("id", projectId);

    if (updateError) {
      return res
        .status(500)
        .json({ message: "Error updating project", error: updateError });
    }

    // Create notification for the user
    await supabase.from("notifications").insert([
      {
        user_id: req.user.id,
        title: "Contribution Received",
        message: `Thank you for your $${amount} contribution!`,
        type: "contribution",
        read: false,
      },
    ]);

    res.status(201).json({
      contribution,
      message: "Contribution successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
