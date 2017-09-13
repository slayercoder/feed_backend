const express = require("express");
const app = express();
const morgan = require("morgan");
const async = require("async");
const path = require("path");
const config = require('./models/config.js');
const port = process.env.PORT || config.port;
app.use(morgan("dev"));



app.get("/", function(req,res){
    res.json({"key" : "value"});

});




app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});