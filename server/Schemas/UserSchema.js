import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{
      imdbID: String,
      title: String,
      year: String,
      poster: String
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
