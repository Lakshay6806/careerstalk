const express = require("express");
// import express from "express";
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const Router = express.Router();


dotenv.config();

const connect = () => {
    mongoose.set("strictQuery",false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('connect to mongodb database')
    })
    .catch((err) => {
      throw err;
    });
};

app.use("/images", express.static(path.join(__dirname, "public/images"))) 

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});  

const upload = multer(storage);
app.post("/api/upload",upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded sucessfully.")
  } catch(err) {
    console.log(err)
  }
})

// app.get("/", (req, res) => {
//     res.send("Welcome to homepage");
// })

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);



app.listen(8000, () => {
    connect();
    console.log('Listening to port 8000')
  })
  