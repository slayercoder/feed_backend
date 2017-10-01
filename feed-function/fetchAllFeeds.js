const parser = require('rss-parser');
const feedSchemaModel = require("../models/schemas/FeedSchema");

function FetchAllFeeds(){
        feedSchemaModel.count({}, function(err, num){
            if(num === 0){
                (function(){
                    parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
                        let len = parsed.feed.entries.length;
                        let item = parsed.feed.entries;
                        let regex = /https:\/\/www.toptal.com\/nodejs/;
                        for(let i = 0; i < len; i++){
                            if(regex.test(item[i].link)){
                                let entry = new feedSchemaModel({
                                    title : item[i].title,
                                    description : item[i].content,
                                    date : item[i].pubDate,
                                    link : item[i].link,
                                    creator : item[i].creator,
                                    media_url : "www.image.com/image.jpg",
                                    category : "nodejs",
                                    archived : false,
                                    published : false
                                });
                                entry.save(function(e){
                                    if(e) throw e;
                                    console.log("feed added from toptal");
                                });
                            }
                        }
                    });
                })();
    
                (function(){    
                    parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
                        let len = parsed.feed.entries.length;
                        let item = parsed.feed.entries;
                        for(let i = 0; i < len; i++){                            
                                let entry = new feedSchemaModel({
                                title : item[i].title,
                                description : item[i].content,
                                date : item[i].pubDate,
                                link : item[i].link,
                                creator : item[i].creator,
                                media_url : "www.image.com/image.jpg",
                                category : "nodejs",
                                archived : false,
                                published : false
                            });
            
                            entry.save(function(e){
                                if(e) throw e;
                                console.log("feed added from nodesource");
                            });
                        
                        }
                    });
                })();
    
                (function(){
                    parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse,parsed){
                        let len = parsed.feed.entries.length;
                        let item = parsed.feed.entries;
                        for(let i = 0; i < len; i++){
                            var entry = new feedSchemaModel({
                                title : item[i].title,
                                description : item[i].content,
                                date : item[i].pubDate,
                                link : item[i].link,
                                creator : item[i].creator,
                                media_url : "www.image.com/image.jpg",
                                category : "devops",
                                archived : false,
                                published : false
                            });
                            entry.save(function(e){
                                if(e) throw e;
                                console.log("feed added from productplan");
                            });
                        }
                    });
                })();
    
                
            (function(){    
                parser.parseURL("https://devops.com/feed/", function(err_parse,parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            media_url : "www.image.com/image.jpg",
                            category : "devops",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added from devops.com");
                        });
                    }
                });
    
            })();

            (function(){
                parser.parseURL("https://www.devopsguys.com/blog/feed/", function(err_parse,parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        var entry = new feedSchemaModel({
                            title : item[i].title,
                            description : item[i].contentSnippet,
                            date : item[i].pubDate,
                            link : item[i].link,
                            creator : item[i].creator,
                            media_url : "www.image.com/image.jpg",
                            category : "devops",
                            archived : false,
                            published : false
                        });
                        entry.save(function(e){
                            if(e) throw e;
                            console.log("feed added from devops guys");
                        });
                    }
                });
            })();
        }
        
        else{
            
            (function(){
                parser.parseURL("http://www.toptal.com/blog.rss", function(error,parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    let regex = /https:\/\/www.toptal.com\/nodejs/;
                    for(let i = 0; i < len; i++){
                        if(regex.test(item[i].link)){
                            let titleName = item[i].title;
                            feedSchemaModel.find({"title" : titleName}, function(err, searchedItem){
                                if(searchedItem.length === 0){
                                    let entry = new feedSchemaModel({
                                        title : item[i].title,
                                        description : item[i].content,
                                        date : item[i].pubDate,
                                        link : item[i].link,
                                        creator : item[i].creator,
                                        media_url : "www.image.com/image.jpg",
                                        category : "nodejs",
                                        archived : false,
                                        published : false
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
            })();
                
            (function(){
                parser.parseURL("https://nodesource.com/blog/rss", function(error,parsed){       
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        let titleName = item[i].title;
                        feedSchemaModel.find({"title" : titleName}, function(err,searchedItem){
                            if(searchedItem.length === 0){
                                let entry = new feedSchemaModel({
                                    title : item[i].title,
                                    description : item[i].content,
                                    date : item[i].pubDate,
                                    link : item[i].link,
                                    creator : item[i].creator,
                                    media_url : "www.image.com/image.jpg",
                                    category : "nodejs",
                                    archived : false,
                                    published : false
                                });
            
                                entry.save(function(e){
                                    if(e) throw e;
                                    console.log("feed added from nodesource");
                                });
                            }
                        });                            
                    }
                });
            })();

            (function(){
                parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse, parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        feedSchemaModel.find({"title" : item[i].title}, function(err,searchedItem){
                            if(searchedItem.length === 0){
                                var entry = new feedSchemaModel({
                                    title : item[i].title,
                                    description : item[i].content,
                                    date : item[i].pubDate,
                                    link : item[i].link,
                                    creator : item[i].creator,
                                    media_url : "www.image.com/image.jpg",
                                    category : "devops",
                                    archived : false,
                                    published : false
                                });
                                entry.save(function(e){
                                    if(e) throw e;
                                    console.log("feeds added from devops.com");
                                });
                            }
                        });

                    }
                });
            })();
            (function(){
                parser.parseURL("https://devops.com/feed/", function(err_parse,parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        feedSchemaModel.find({"title" : item[i].title}, function(err,searchedItem){
                            if(searchedItem.length === 0){
                                var entry = new feedSchemaModel({
                                    title : item[i].title,
                                    description : item[i].contentSnippet,
                                    date : item[i].pubDate,
                                    link : item[i].link,
                                    creator : item[i].creator,
                                    media_url : "www.image.com/image.jpg",
                                    category : "devops",
                                    archived : false,
                                    published : false
                                });
                                entry.save(function(e){
                                    if(e) throw e;
                                    console.log("feeds added from devops.com");
                                });                
                            }
                        });
                        
                    }
                });
            })();
            (function(){
                parser.parseURL("https://www.devopsguys.com/blog/feed/", function(err_parse,parsed){
                    let len = parsed.feed.entries.length;
                    let item = parsed.feed.entries;
                    for(let i = 0; i < len; i++){
                        feedSchemaModel.find({"title" : item[i].title}, function(err, searchedItem){
                            if(searchedItem.length === 0){
                                var entry = new feedSchemaModel({
                                    title : item[i].title,
                                    description : item[i].contentSnippet,
                                    date : item[i].pubDate,
                                    link : item[i].link,
                                    creator : item[i].creator,
                                    media_url : "www.image.com/image.jpg",
                                    category : "devops",
                                    archived : false,
                                    published : false
                                });
                                entry.save(function(e){
                                    if(e) throw e;
                                    console.log("feed added from devops guys");
                                });
                            }
                        });
                            
                    }
                });
            })();
        }
    });
           
        
    }

module.exports = FetchAllFeeds;