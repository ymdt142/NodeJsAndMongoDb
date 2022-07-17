const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");


const dishRouter = require("./routes/dishRoute");
const Dishes = require("./models/dishes");
const morgan = require("morgan");

const url = "localhost";
const port = 3000;

// mongo url
const mongoUrl = "mongodb://localhost:27017/conFusion";

//connect to mongoDb
const mongoose = require("mongoose");
const connect = mongoose.connect(mongoUrl);
connect.then((db)=>{
    console.log("Connected Correctly");
},(err=>{
    console.log(err);
}));

//create express object
const app = express();

//optional to log the request we use morgan
app.use(morgan('dev'));

//mount router to the end points
app.use("/dishes",dishRouter);
app.use("/:dishId",dishRouter);

//create server
const createServer = http.createServer(app);
//listern to server
createServer.listen(port,url,()=>{
    console.log(`Express server is running at http://${url}:${port}`);
})
