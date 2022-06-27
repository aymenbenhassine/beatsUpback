const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  img: { type: String },
  video: { type: String, default: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"},
  likeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Music", MusicSchema);
