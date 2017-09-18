// express setup
const express = require("express");
const app = express();
const path = require("path");
const config = require('./models/config.js');
const port = process.env.PORT || config.port;

// third party modules
const morgan = require("morgan");
const async = require("async");
const parser = require("rss-parser");

// mongoDB methods wrapper
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/appDb");
const db = mongoose.connection;
const Nodejs = require("./models/schemas/Nodejs");
// database connection errors
db.on("error", function(){
    console.log("error");
});

db.once("open", function(){
    console.log("connected to database");
});

// categories function imports
const Node_Category = require("./feed-function/nodejs_function");
const Devops_Category = require("./feed-function/devops_function");

// application middlewares
app.use(morgan("dev"));
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
});

// multiple feed category calls
app.get("/", function(req,res){
            Node_Category();
            Devops_Category();
});
 
app.get("/feeds/nodejs", function(req,res){
    Nodejs.find({"category" : "nodejs"}, function(err, data){
        res.json(data);
    });
});

app.get("/feeds/devops", function(req,res){
    Devops.find({"category" : "devops"}, function(err, data){
        res.json(data);
    });
});

app.get("/count", function(req,res){
    Nodejs.count({}, function(err,cnt){
        res.json(cnt);
    });
});




app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});






/***************************Commented_Code***************************/
