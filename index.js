const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const musicRoute = require("./routes/musics");
const collectionRoute = require("./routes/collections");
const router = require('./routes/routes');
//E-commerce
const productRouter = require("./routes/E-commerceRoutes/ProductRouter");
// E-Learning

var courseRouter = require('./routes/E-LearningRoutes/CourseController');
var moduleRouter = require('./routes/E-LearningRoutes/ModuleController');
var ressourcesRouter = require('./routes/E-LearningRoutes/RessourcesController');
var quizRouter = require('./routes/E-LearningRoutes/QuizController');
var QuestionRouter = require('./routes/E-LearningRoutes/QuestionController');
var answerRouter = require('./routes/E-LearningRoutes/AnswerController');
var wishListRouter = require('./routes/E-LearningRoutes/WishListController');
var feedbackRouter = require('./routes/E-LearningRoutes/FeedbackController');
var subscriptionRouter = require('./routes/E-LearningRoutes/SubscriptionController');


const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/musics", musicRoute);
app.use("/api/collections", collectionRoute);

app.use('',router );
//E-commerce
app.use('/api/products',productRouter);

// E-Learning

app.use('/api/course', courseRouter);
app.use('/api/module', moduleRouter);
app.use('/api/ressources', ressourcesRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/question', QuestionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/wishlist', wishListRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/feedback', feedbackRouter);

const API_KEY = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

// Email

var mailer = require("nodemailer")
var User = require("./models/User")
var Course = require("./models/E-Learning/course")
var Subscriptions = require("./models/E-Learning/Subscription")

const transporter = mailer.createTransport({
  service:"gmail",
  auth:{
    user :"beatsup2022@gmail.com",
    pass : "beatsup@beatsup.com"
  }
})
const sendEmail= (course,user)=>  {
  
    
    let options = {
      from : "beatsup@hotmail.com",
      to: user?.email|| "mohamed.bouslah@esprit.tn",// user.email
      subject:"Your teacher is live now",
      html : "<h2>Join through this link :</h2><a href="+"http://localhost:3033/dashboard/e-learning/video-user/"+course._id+">Click here to join</a><br>"+"<img src="+course.imageUrl+" alt='course image'></img><br><h2>"+course.title+"</h2><hr>"+course.description
    }
    transporter.sendMail(options,function(err,info){
      if(err){
        console.log(err);
        return;
      }
      console.log("recieved" + info.response)
    })
  
}

/**  const sendEmail=(subscription,course)=>{
    console.log("here");
  for (let i=0; i<subscription.length; i++) {
    async()=> {
      const user = await User.findById(subscription[i].user);
      let options = {
        from : "beatsup@hotmail.com",
        to: "mohamed.bouslah@esprit.tn",// "aymen.benhassine@esprit.tn"
        subject:"Your teacher is live now",
        html : "<h2>Join through this link :</h2><a href="+"http://localhost:3033/dashboard/e-learning/video/"+course._id+">Click here to join</a><br>"+"<img src="+course.imageUrl+" alt='course image'></img><br><h2>"+course.title+"</h2><hr>"+course.description
      }
      transporter.sendMail(options,function(err,info){
        if(err){
          console.log(err);
          return;
        }
        console.log("recieved" + info.response)
      })
  }
    

  }
  
}
 */

const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;
  const course = await Course.findById(roomId);
  console.log(course)
  const subscription = await Subscriptions.find().where("course").equals(roomId);
  for (let i=0; i<subscription.length; i++) {
    const user = await User.findById(subscription[i].user);
    console.log(user)
    sendEmail(course,user);
  }
  
  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});
app.get("/user-video-call/:id", async function (req, res) {
  const roomId = req.params.id;
  
  
  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

/** Elearning Chat Section */

const http = require("http").createServer(app);
http.listen(3001,()=>console.log('socket on 3001'))
const io = require('socket.io')(http,{
  cors : {
      origin : "*",
  },
})

io.on("connection",(socket)=>{
  console.log(socket.id)
  socket.on('send-message',(message)=>{
    socket.broadcast.emit('recieve-message',message)
  })
})


/** ***************   */
