const router = require("express").Router();
const Music = require("../models/Music");
// const verify = require("../verifyToken");

//CREATE

router.post("/", async (req, res) => {
  const newMusic = new Music(req.body);
  try {
    const savedMusic = await newMusic.save();
    res.status(201).json(savedMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.status(200).json("The music has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    res.status(200).json(music);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

//GET ALL

router.get("/", async (req, res) => {
  try {
    const musics = await Music.find();
    res.status(200).json(musics.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
