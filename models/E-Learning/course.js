const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Course = new Schema({
  title: String,
  description: String,
  creationDate: { type: Date, default: Date.now },
  summary: String,
  imageUrl: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "module",
    },
  ],
});
module.exports = mongoose.model("courses", Course);
