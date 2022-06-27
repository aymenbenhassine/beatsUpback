var express = require("express");
var router = express.Router();

var Ressources = require("../../models/E-Learning/Ressources");

// affiche
router.get("/", async (req, res) => {
  try {
    const ressources = await Ressources.find();
    res.status(200).json(ressources.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;