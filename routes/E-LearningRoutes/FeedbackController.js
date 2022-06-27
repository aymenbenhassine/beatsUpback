var express = require("express");
var router = express.Router();

var FeedBack = require("../../models/E-Learning/feedback");
var Course = require("../../models/E-Learning/course");


// Truncate Alll feedbackssss 
router.get("/truncate", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
    console.log("deleting all feedbacks ..")
  try {
    const feedbacks = await FeedBack.find();
    for (let i = 0; i < feedbacks.length; i++) {
       await FeedBack.findByIdAndDelete(feedbacks[i]._id);
    }
    res.status(201).json("Feedback table is now empty");
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
    const feedBack = await FeedBack.find().populate("user");
    res.status(200).json(feedBack.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
// get by id course 
router.get("/:idCourse", async (req, res) => {
  try {
    
    const courses = await Course.find()
    .where("owner").equals(req.params.idUser)
    const feedBack = await FeedBack.find()
    .where("course").equals(req.params.idCourse)
    .populate("user");
    res.status(200).json(feedBack.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

/******************************************************************** */
/**   STATISTICS   */

const countStars=(starNumber,reviews)=>{
  let totalRatings =0 ;
  for(let i=0;i<reviews.length;i++){
    if(reviews[i].rating == starNumber)
    totalRatings++ ;
  }
  return totalRatings;
}

router.get("/statistics/:idUser", async (req, res) => {
  try {
    let result = [];
    let feedbacks = [];
    const courses = await Course.find()
    .where("owner").equals(req.params.idUser);
    for(let i=0;i<courses.length;i++){
      const feedBack = await FeedBack.find()
      .where("course").equals(courses[i]._id)
      feedbacks = feedbacks.concat(feedBack)
    }
    result.push(countStars(1,feedbacks))
    result.push(countStars(2,feedbacks))
    result.push(countStars(3,feedbacks))
    result.push(countStars(4,feedbacks))
    result.push(countStars(5,feedbacks))
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
/************************************************************************************* */

// add feedback 

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newFeedBack = new FeedBack(req.body);
  try {
    const savedFeedBack = await newFeedBack.save();
    const feedback = await FeedBack.findById(savedFeedBack._id).populate("user")
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

// DELETE 

router.delete("/:id", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  try {
    await FeedBack.findByIdAndDelete(req.params.id);
    res.status(201).json("The REVIEW has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});


module.exports = router;