const Nodejs_model = require("../models/schemas/Nodejs");
const parser = require("rss-parser");

function Function_for_fetching_Nodejs_feeds(){
    Nodejs_model.count({}, function(err,num){
        if(num === 0){
            // series of code to be run in sequence so that feeds from  different sources are stored in DB
            parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(let i = 0; i < len; i++){
                    let regex = /https:\/\/www.toptal.com\/nodejs/;
                    if(regex.test(item[i].link)){
                        let entry = new Nodejs_model({
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
                for(let i = 0; i < len; i++){                            
                        let entry = new Nodejs_model({
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
                var regex = /https:\/\/www.toptal.com\/nodejs/;
                for(let i = 0; i < len; i++){
                    if(regex.test(item[i].link)){
                        let titleName = item[i].title;
                        Nodejs_model.find({"title" : titleName}, function(err, searchedItem){
                            if(searchedItem.length === 0){
                                let entry = new Nodejs_model({
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
                for(let i = 0; i < len; i++){
                    let titleName = item[i].title;
                    Nodejs_model.find({"title" : titleName}, function(err,searchedItem){
                        if(searchedItem.length === 0){
                            let entry = new Nodejs_model({
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

module.exports = Function_for_fetching_Nodejs_feeds;