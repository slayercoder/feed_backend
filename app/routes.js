const express = require("express");
const router = express.Router();
const path = require("path");
const Nodejs_model = require("../models/schemas/Nodejs");
const Devops_model = require("../models/schemas/Devops");

// categories function imports
const Function_for_fetching_Nodejs_feeds = require("../feed-function/nodejs_function");
const Function_for_fetching_Devops_feeds = require("../feed-function/devops_function");



router.get("/", function(req,res){
    Function_for_fetching_Nodejs_feeds();
    Function_for_fetching_Devops_feeds();
});

router.get("/feeds",function(req,res){
    var feeds = [];
    Nodejs_model.find({"category" : "nodejs"}, function(err, data){
       feeds = feeds.concat(data);
        Devops_model.find({"category" : "devops"}, function(err, data){
            feeds = feeds.concat(data);
            res.json(feeds)
        });
    });   
});

router.get("/feeds/nodejs", function(req,res){
    Nodejs_model.find({"category" : "nodejs"}, function(err, data){
        res.json(data);
    });
});

router.post("/feeds/nodejs", function(req,res){
    let len = req.body.data.length;
    let selectedFeeds = req.body.data;
    for(let i = 0; i < len; i++){
        let selectedTitle = selectedFeeds[i].title;
        Nodejs_model.findOneAndRemove({"title" : selectedTitle}, function(err){
            if(!err){
                console.log("deleted");
            }
        });
    }
    res.send(req.body.data);
});

router.get("/feeds/devops", function(req,res){
    Devops_model.find({"category" : "devops"}, function(err, data){
        res.json(data);
    });
});

router.post("/feeds/devops", function(req,res){
    let len = req.body.data.length;
    let selectedFeeds = req.body.data;
    for(let i = 0; i < len; i++){
        let selectedTitle = selectedFeeds[i].title;
        Devops_model.findOneAndRemove({"title" : selectedTitle}, function(err){
            if(!err){
                console.log("deleted");
            }
        });
    }
    res.send(req.body.data);
});

router.get("/count", function(req,res){
    var total = 0;
    Nodejs_model.count({}, function(err,cnt){
        total += cnt;
        Devops_model.count({}, function(err,cnt){
            total += cnt;
            res.json(total);
        });
    });
});




module.exports = router;