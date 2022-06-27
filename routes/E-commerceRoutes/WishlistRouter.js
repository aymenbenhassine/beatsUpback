var express = require("express");
var router = express.Router();
var wishlist = require("../../models/E-Commerce/wishlist");

// Get
router.get("/", async (req, res) => {
  try {
    const wishlist = await wishlist.find();
    res.status(200).json(wishlist.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE
router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newWish = new wishlist(req.body);
  try {
    const savedwish = await newWish.save();
    res.status(201).json(savedwish);
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
    await wishlist.findByIdAndDelete(req.params.id);
    res.status(201).json("The wish has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

module.exports = router;