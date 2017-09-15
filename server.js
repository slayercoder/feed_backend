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
const Nodejs = require("./models/schemas/Nodejs");
mongoose.connect("mongodb://localhost/appDb");
const db = mongoose.connection;
// database connection errors
db.on("error", function(){
    console.log("error");
});
db.once("open", function(){
    console.log("connected to database");
});


// application middlewares
app.use(morgan("dev"));

app.get("/", function(req,res){
    
    parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){       
                        var len = parsed.feed.entries.length;
                        var item = parsed.feed.entries;
                        Nodejs.count({}, function(err,num){
                            if(num === 0){
                                for(var i = 0; i < len; i++){
                                    var regex = /https:\/\/www.toptal.com\/nodejs/;
                                    if(regex.test(item[i].link)){
                                        var entry = new Nodejs({
                                            title : item[i].title,
                                            description : item[i].content,
                                            date : item[i].pubDate,
                                            link : item[i].link,
                                            creator : item[i].creator,
                                            media_url : "www.image.com/image.jpg",
                                            category : "nodejs"
                                        });
                                        entry.save(function(e){
                                            if(e) throw e;
                                            console.log("feed added");
                                        });
                                    }
                                }
                                res.end();
                            }
                            
                            else{
                                for(var i = 0; i < len; i++){
                                    var regex = /https:\/\/www.toptal.com\/nodejs/;
                                    if(regex.test(item[i].link)){
                                        Nodejs.find({"title" : item[i].title}, function(err, x){
                                            if(err){
                                                var entry = new Nodejs({
                                                    title : item[i].title,
                                                    description : item[i].content,
                                                    date : item[i].pubDate,
                                                    link : item[i].link,
                                                    creator : item[i].creator,
                                                    media_url : "www.image.com/image.jpg",
                                                    category : "nodejs"
                                                });
                                                entry.save(function(e){
                                                    if(e) throw e;
                                                    console.log("feed added");
                                                });
                                            }
                                        });
                                    }
                                }
                                res.end();            
                            }                                
                        });
                    });
                        
    });

    

app.get("/find", function(req,res){
    Nodejs.find({"title" : "A Step-by-step Guide to Creating Animated Product Explainer Videos"}, function(err, data){
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