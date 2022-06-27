var express = require("express");
var router = express.Router();

var Answer = require("../../models/E-Learning/Answer");

// affiche
router.get("/", async (req, res) => {
  try {
    const answer = await Answer.find();
    res.status(200).json(answer.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// add Answer 

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newAnswer = new Answer(req.body);
  try {
    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

module.exports = router;