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
const Feed = require("./models/schemas/feedSchema");
const db = mongoose.connection;
mongoose.connect("mongodb://localhost/appDb");
// application middlewares
app.use(morgan("dev"));

app.get("/", function(req,res){
    parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
        
                        var len = parsed.feed.entries.length;
                        var item = parsed.feed.entries;
                        
                        for(var i = 0; i < len; i++){
                            Feed.find({"title" : item[i].title}, function(err, x){
                                if(err){
                                    var entry = new Feed({
                                        title : item[i].title,
                                        description : item[i].content,
                                        date : item[i].pubDate,
                                        link : item[i].link,
                                        creator : item[i].creator,
                                        category : "nodejs"
                                    });
                                    entry.save(function(e){
                                        if(e) throw e;
                                        console.log("feed added");
                                    });
                                }
                            });
                        }
                        res.end();
                    });
});

    

app.get("/find", function(req,res){
    Feed.find({"title" : "A Step-by-step Guide to Creating Animated Product Explainer Videos"}, function(err, data){
        res.json(data);
    });
});



app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});