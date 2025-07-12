import express from "express";
import User from "../model/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET user(s) data (admin sees all, user sees self)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role.includes("admin")) {
      const users = await User.find().select("-password");
      return res.json(users);
    }

    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// DELETE user by ID (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.user.role.includes("admin")) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// PUT update user by ID (admin)
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.user.role.includes("admin")) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;
