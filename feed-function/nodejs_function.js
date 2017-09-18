const Nodejs = require("../models/schemas/Nodejs");
const parser = require("rss-parser");

function NodeF(){
    Nodejs.count({}, function(err,num){
        if(num === 0){
            // series of code to be run in sequence so that feeds from  different sources are stored in DB
            parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
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
                            console.log("feed added from toptal");
                        });
                    }
                }
            });
    
            parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){                            
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
                        console.log("feed added from nodesource");
                    });
                
                }
            });
        }
        
    
        else{
            // conditional code will be running which will prevent duplicate entry of feeds from rss feeds
            parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
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
                                    console.log("feed added from toptal");
                                });
                            }
                        });
                    }
                }
            });
            
            parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    Nodejs.find({"title" : item[i].title}, function(err,x){
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
                                console.log("feed added from nodesource");
                            });
                        }
                    });                            
                }
            });
        
        }
    });
    
}

module.exports = NodeF;