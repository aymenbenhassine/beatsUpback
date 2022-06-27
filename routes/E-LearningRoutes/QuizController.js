var express = require("express");
var router = express.Router();

var Quiz = require("../../models/E-Learning/Quiz");
var Question = require("../../models/E-Learning/Question");


router.get("/truncate", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  console.log("deleting all questions ..")
  try {
    const quiz = await Quiz.find();
    for (let i = 0; i < quiz.length; i++) {
      const question = await Question.find()
        .where("quiz").equals(quiz[i]._id);
      for (let j = 0; j < question.length; j++) {
        await Question.findByIdAndDelete(question[j]._id);
      }
      await Quiz.findByIdAndDelete(quiz[i]._id);
    }
    res.status(201).json("all quiz deleted...");
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
    const quiz = await Quiz.find()
      .populate("module")
      .populate("question");
    res.status(200).json(quiz.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:idUser", async (req, res) => {
  try {
    const quiz = await Quiz.find()
      .where("user").equals(req.params.idUser)
      .populate("module")
      .populate("question");
    res.status(200).json(quiz.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/module/:idModule", async (req, res) => {
  try {
    const quiz = await Quiz.find()
      .where("module").equals(req.params.idModule)
      .populate("module")
      .populate("question");
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json(err);
  }
});
// CREATE 

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newQuiz = new Quiz(req.body);
  console.log(req.body)
  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
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
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(quiz);
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
    const question = await Question.find()
      .where("quiz").equals(req.params.id);
    for (let i = 0; i < question.length; i++) {
      await Question.findByIdAndDelete(question[i]._id);
    }
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(201).json("Quiz and it's questions has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

router.get("/find/:id", function (req, res, next) {
  Quiz.findById(req.params.id, (err, quiz) => {
    res.json(quiz);
  });
});


module.exports = router;