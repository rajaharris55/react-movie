import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { User } from "../Schemas/UserSchema.js";

const router = express.Router();

router.post("/favorites", verifyToken, async (req, res) => {
  try {
    const { imdbID } = req.body;
    if (!imdbID)
      return res.status(400).json({ message: "IMDb ID is required" });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favorites.includes(imdbID)) {
      user.favorites.push(imdbID);
      await user.save();
    }

    res.json({
      message: "Movie added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/favorites/:imdbID", verifyToken, async (req, res) => {
  try {
    const { imdbID } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter((id) => id !== imdbID);
    await user.save();

    res.json({
      message: "Movie removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/favorites", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
