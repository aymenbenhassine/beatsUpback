var express = require("express");
var router = express.Router();

var WishList = require("../../models/E-Learning/WishList");
var Course = require("../../models/E-Learning/course");

// affiche
/** truncate all wishes */
router.get("/truncate", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
    console.log("deleting all em wishes ..")
  try {
    const wishList = await WishList.find()
    for(let i=0 ; i<wishList.length;i++){
      await WishList.findByIdAndDelete(wishList[i]._id);
    }
    res.status(201).json("The wish has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

router.get("/", async (req, res) => {
  try {
    const wishList = await WishList.find()
    .populate("course");
    res.status(200).json(wishList.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:idUser", async (req, res) => {
  try {
    const wishList = await WishList.find().where("user").equals(req.params.idUser)
    .populate("course");
    res.status(200).json(wishList.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

/***********                  Statistics                  ***********************/

router.get("/statistics/getTotalWishlists/:idUser", async (req, res) => {
  try {
    let result = 0;
    const courses = await Course.find()
    .where("owner").equals(req.params.idUser);
    for(let i=0;i<courses.length;i++){
      const numSubs = await WishList.count()
      .where("course").equals(courses[i]._id)
        result += numSubs ;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newWish = new WishList(req.body);
  const wishList = await WishList.exists()
      .where("user").equals(req.body.user)
      .where("course").equals(req.body.course);
  try {
    if (!wishList) {
    const savedwish = await newWish.save();
    res.status(201).json(savedwish);
    }else
    res.status(201).json("wish already exists");

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
    await WishList.findByIdAndDelete(req.params.id);
    res.status(201).json("The wish has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

router.delete("/:idUser/:idCourse", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    const wishList = await WishList.find()
    .where("user").equals(req.params.idUser)
    .where("course").equals(req.params.idCourse);
    for(let i=0 ; i<wishList.length;i++){
      await WishList.findByIdAndDelete(wishList[i]._id);
    }
    res.status(201).json("The wish has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});




module.exports = router;