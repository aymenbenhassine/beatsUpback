const spawn = require("child_process");

var express = require("express");
var router = express.Router();
const verify = require("../../verifyToken");

var Course = require("../../models/E-Learning/course");
// affiche
router.get("/", async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json(course.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
// affiche with userId
router.get("/:idUser", async (req, res) => {
  try {
    const course = await Course.find().where("owner").equals(req.params.idUser);
    res.status(200).json(course.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE

router.post("/", async (req, res) => {
  // if (req.user.isAdmin || req.user.isArtist) {
  const newCource = new Course(req.body);
  try {
    const savedCourse = await newCource.save();
    res.status(201).json(savedCourse);
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
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCourse);
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
    await Course.findByIdAndDelete(req.params.id);
    res.status(201).json("The course has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  // res.status(403).json("You are not allowed!");
  // }
});

router.get("/find/:id", function (req, res, next) {
  Course.findById(req.params.id, (err, courses) => {
    res.json(courses);
  });
});
// scraping
router.get("/searchcourse/:search", async (req, res) => {
  try {
    const search = req.params.search ;

    const process = spawn.spawn("python", ["../server/routes/scraping/lyrics.py", search]);
    var response = "";
    process.stdout.on("data", (data) => {
      response += data.toString();
      const myArray = response.split("\n");
      list = []
      for(let i=0 ; i < myArray.length;i++){
        let obj = {
          url : myArray[i]
        }
        list.push(obj)
      }
      res.status(200).json(myArray);
    });
    /*
      spawn.exec('node lyrics.mjs {{args}}',
      function (error, stdout, stderr) {
          console.log(stdout);
          if (error !== null) {
          console.log('exec error: ' + error);
          }
          res.send(stdout)
      });
      */
  } catch (err) {
    res.send("Error" + err);
  }
});



module.exports = router;
