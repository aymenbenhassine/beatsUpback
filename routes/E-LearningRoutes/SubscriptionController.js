var express = require("express");
var nodemailer = require("nodemailer")
var router = express.Router();

const transporter = nodemailer.createTransport({
  service : "gmail",
  auth : {
    user : "beatsup2022@gmail.com",
    pass : "beatsup@beatsup.com"
  }
})


var Subscription = require("../../models/E-Learning/Subscription");
var Course = require("../../models/E-Learning/course");
var User = require("../../models/User");

// affiche

// Truncate Alll subss 
router.get("/truncate", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
    console.log("deleting all subs ..")
  try {
    const subscription = await Subscription.find();
    for (let i = 0; i < subscription.length; i++) {
       await Subscription.findByIdAndDelete(subscription[i]._id);
    }
    res.status(201).json("subscriptions deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});
/**  ******************************************************  */

router.get("/", async (req, res) => {
  try {
    const subscription = await Subscription.find()
      .populate("course");
    res.status(200).json(subscription.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:idUser", async (req, res) => {
  try {
    const subscription = await Subscription.find().where("user").equals(req.params.idUser)
      .populate("course"); //filter out the ones that don't have a category
    // const subscription = await Subscription.find();
    res.status(200).json(subscription.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/mycourses/:idUser", async (req, res) => {
  try {
    const subscription = await Subscription.find().where("user").equals(req.params.idUser); //filter out the ones that don't have a category
    let courses = [];
    for (let i = 0; i < subscription.length; i++) {
      course = await Course.findById(subscription[i].course);
      courses.push(course)
    }
    // console.log(courses)
    res.status(200).json(courses.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

/******************************           STATSTICS             *********************************************** */
router.get("/statistics/:idUser", async (req, res) => {
  try {
    let result = [];
    const courses = await Course.find()
    .where("owner").equals(req.params.idUser);
    for(let i=0;i<courses.length;i++){
      const numSubs = await Subscription.count()
      .where("course").equals(courses[i]._id)
      result.push({
        title : courses[i].title,
        subscribers: numSubs,
      })
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/statistics/getTotalSubscriptions/:idUser", async (req, res) => {
  try {
    let result = 0;
    const courses = await Course.find()
    .where("owner").equals(req.params.idUser);
    for(let i=0;i<courses.length;i++){
      const numSubs = await Subscription.count()
      .where("course").equals(courses[i]._id)
        result += numSubs ;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/statistics/countCourses/:idUser", async (req, res) => {
  try {
    const result = await Course.count()
    .where("owner").equals(req.params.idUser);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/countSubscribers/:idCourse", async (req, res) => {
  try {
    const result = await Subscription.count()
    .where("course").equals(req.params.idCourse);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
//CREATE

/* Send Email */
const sendEmail = (course,user)=>{
  const options = {
    from : "beatsup2022@gmail.com",
    to: user.email,// "aymen.benhassine@esprit.tn"
    subject:"New Subscription!",
    html : "<h2>Congrats Artist you have subscriped to a new course !</h2><br><h3>Keep learning and keep it up</h3><br>"+"<img src="+course.imageUrl+" alt='course image'></img><br><h2>"+course.title+"</h2><hr>"+course.description
  }
  transporter.sendMail(options,function(err,info){
    if(err){
      console.log(err);
      return;
    }
    console.log("recieved" + info.response)
  })
}
router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
    console.log(req.body)
  const newSubscription = new Subscription(req.body);
  console.log(newSubscription)
  try {
    const subscription = await Subscription.exists()
      .where("user").equals(req.body.user)
      .where("course").equals(req.body.course);
    if (!subscription) {
      const savedSubscription = await newSubscription.save();
      const user = await User.findById(savedSubscription.user);
      const course = await Course.findById(savedSubscription.course);
      sendEmail(course,user);
      res.status(201).json(savedSubscription);
    } else
      res.status(201).json("subscription already exists");



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
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(201).json("The subscrition has been deleted...");
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
    const subscription = await Subscription.find()
      .where("user").equals(req.params.idUser)
      .where("course").equals(req.params.idCourse);
    for (let i = 0; i < subscription.length; i++) {
      await Subscription.findByIdAndDelete(subscription[i]._id);
    }
    res.status(201).json("The subscrition has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});


module.exports = router;
