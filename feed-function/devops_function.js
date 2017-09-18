const Devops = require("../models/schemas/Devops");
const parser = require("rss-parser");

function DevopsF(){
    Devops.count({}, function(err_num, num){
        if(num === 0){
            parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    var entry = new Devops({
                        title : item[i].title,
                        description : item[i].content,
                        date : item[i].pubDate,
                        link : item[i].link,
                        creator : item[i].creator,
                        media_url : "www.image.com/image.jpg",
                        category : "devops"
                    });
                    entry.save(function(e){
                        if(e) throw e;
                        console.log("feeds added from productplan");
                    });
                }
            });
            parser.parseURL("https://devops.com/feed/", function(err_parse,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    var entry = new Devops({
                        title : item[i].title,
                        description : item[i].contentSnippet,
                        date : item[i].pubDate,
                        link : item[i].link,
                        creator : item[i].creator,
                        media_url : "www.image.com/image.jpg",
                        category : "devops"
                    });
                    entry.save(function(e){
                        if(e) throw e;
                        console.log("feeds added from devops.com");
                    });
                }
            });
        }

        
        
        else{
            parser.parseURL("https://www.productplan.com/blog/feed/", function(err_parse, parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    Devops.find({"title" : item[i].title}, function(err,x){
                        if(err){
                            var entry = new Devops({
                                title : item[i].title,
                                description : item[i].content,
                                date : item[i].pubDate,
                                link : item[i].link,
                                creator : item[i].creator,
                                media_url : "www.image.com/image.jpg",
                                category : "devops"
                            });
                            entry.save(function(e){
                                if(e) throw e;
                                console.log("feeds added from devops.com");
                            });
                        }
                    });

                }
            });

            parser.parseURL("https://devops.com/feed/", function(err_parse,parsed){
                var len = parsed.feed.entries.length;
                var item = parsed.feed.entries;
                for(var i = 0; i < len; i++){
                    Devops.find({"title" : item[i].title}, function(err,x){
                        if(err){
                            var entry = new Devops({
                                title : item[i].title,
                                description : item[i].contentSnippet,
                                date : item[i].pubDate,
                                link : item[i].link,
                                creator : item[i].creator,
                                media_url : "www.image.com/image.jpg",
                                category : "devops"
                            });
                            entry.save(function(e){
                                if(e) throw e;
                                console.log("feeds added from devops.com");
                            });                
                        }
                    });
                    
                }
            });
        }
    });
}

module.exports = DevopsF;