// express setup
const express = require("express");
const app = express();
const path = require("path");
const config = require('./models/config.js');
const port = process.env.PORT || config.port;
const router = require("./app/routes");

// third party modules
const morgan = require("morgan");
const async = require("async");
const parser = require("rss-parser");

// mongoDB methods wrapper
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/appDb");
const db = mongoose.connection;

// database connection
db.on("error", function(){
    console.log("error");
});

db.once("open", function(){
    console.log("connected to database");
});

// application middlewares
app.use(morgan("dev"));
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

app.use("/", router); 

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});






/***************************Commented_Code***************************/
