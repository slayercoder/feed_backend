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
// const mongodb = require("mongodb");
mongoose.connect("mongodb://localhost/appDb");

// application middlewares
app.use(morgan("dev"));

    parser.parseURL("http://www.toptal.com/blog.rss", function(err,parsed){

                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    var entry = new Feed({
                        title : item[i].title,
                        description : item[i].content,
                        date : item[i].pubDate,
                        link : item[i].link,
                        creator : item[i].creator,
                        category : "nodejs"
                    });
                    entry.save(function(err){
                        if(err) throw err;
                        console.log("feed added");
                    });
                                     
                }
            });

    





app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});