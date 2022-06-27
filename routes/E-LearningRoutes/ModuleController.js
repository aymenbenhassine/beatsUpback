var express = require("express");
var router = express.Router();
const verify = require("../../verifyToken");

var Module = require("../../models/E-Learning/Module");

// affiche
router.get("/", async (req, res) => {
  try {
    const module = await Module.find();
    res.status(200).json(module.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
// affiche
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    //const module = await Module.findByCourseId(req.params.id);
    const module = await Module.find().where("course").equals(req.params.id); //filter out the ones that don't have a category
    res.status(200).json(module);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newModule = new Module(req.body);
  try {
    const savedModule = await newModule.save();
    res.status(201).json(savedModule);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

//UPDATE

router.put("/:id", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedModule);
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
    await Module.findByIdAndDelete(req.params.id);
    res.status(201).json("The course has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

module.exports = router;
