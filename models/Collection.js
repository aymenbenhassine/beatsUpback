const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  creator: { type: String },
  content: { type: Array },
  tags: [String],
  cover: { type: String },
  trailer: { type: String },
  genre: { type: String },
  // likeCount: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Collection", CollectionSchema);
