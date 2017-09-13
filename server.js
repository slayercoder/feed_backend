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
const Feed = require("./models/schemas/feedSchema");
const mongodb = require("mongodb");
mongoose.connect("mongodb://localhost/appDb");

// application middlewares
app.use(morgan("dev"));


setInterval(function(){
    
        parser.parseURL("http://www.toptal.com/blog.rss", function(err,parsed){
            
            
                for(var i = 0; i < len - documentCount; i++){
                    var entry = new Feed({
                        title : item.title,
                        description : item.content,
                        date : item.pubDate,
                        link : item.link,
                        creator : item.creator,
                        category : "nodejs"
                    });
                    entry.save(function(err){
                        if(err) throw err;
                        console.log("feed added");
                    });                 
                }
            });

},172800000);





app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});