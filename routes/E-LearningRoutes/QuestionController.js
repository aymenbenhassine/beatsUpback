var express = require("express");
var router = express.Router();

var Question = require("../../models/E-Learning/Question");

// Truncate Alll questions 
router.get("/truncate", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
    console.log("deleting all questions ..")
  try {
    const question = await Question.find();
    for (let i = 0; i < question.length; i++) {
       await Question.findByIdAndDelete(question[i]._id);
    }
    res.status(201).json("questions deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

// affiche
router.get("/", async (req, res) => {
  try {
    const question = await Question.find();
    res.status(200).json(question.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});





router.get("/:id", async (req, res) => {
  try {
    //const module = await Module.findByCourseId(req.params.id);
    const question = await Question
    .find()
    .where('quiz').equals(req.params.id)//filter out the ones that don't have a category
    res.status(200).json(question.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE 

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

///  UPDATE
router.put("/:id", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

//DELETE

router.delete("/:id", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(201).json("Question has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

router.get("/find/:id", function (req, res, next) {
  Question.findById(req.params.id, (err, question) => {
    res.json(question);
  });
});

module.exports = router;