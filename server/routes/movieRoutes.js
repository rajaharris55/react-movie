import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { User } from "../Schemas/UserSchema.js";

const router = express.Router();

// Add movie to favorites
router.post("/favorites", verifyToken, async (req, res) => {
  try {
    const { imdbID, title, year, poster } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if movie already exists in favorites
    if (user.favorites.includes(imdbID)) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    user.favorites.push({ imdbID, title, year, poster });
    await user.save();

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding favorite", error: error.message });
  }
});

// Get user's favorites
router.get("/favorites", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching favorites", error: error.message });
  }
});

// Remove movie from favorites
router.delete("/favorites/:imdbID", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { imdbID } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter((movie) => movie.imdbID !== imdbID);
    await user.save();

    res.status(200).json({ message: "Movie removed from favorites" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing favorite", error: error.message });
  }
});

export default router;
