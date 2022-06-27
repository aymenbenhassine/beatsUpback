const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String, default: "https://pbs.twimg.com/profile_images/1503478509292777475/hX8DdiE1_400x400.jpg" },
  isAdmin: { type: Boolean, default: false },
  isArtist: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", UserSchema);
