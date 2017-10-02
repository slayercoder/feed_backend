const express = require("express");
const router = express.Router();
const path = require("path");
const Nodejs_model = require("../models/schemas/Nodejs");
const Devops_model = require("../models/schemas/Devops");
const feedSchemaModel = require("../models/schemas/FeedSchema");

// categories function imports
// const Function_for_fetching_Nodejs_feeds = require("../feed-function/nodejs_function");
// const Function_for_fetching_Devops_feeds = require("../feed-function/devops_function");
const FetchAllFeeds = require("../feed-function/fetchAllFeeds");

// API endpoints GET / POST / PUT /DELETE
router.get("/", function(req,res){
    // Function_for_fetching_Nodejs_feeds();
    // Function_for_fetching_Devops_feeds();
    FetchAllFeeds();
});

router.get("/feeds",function(req,res){
    feedSchemaModel.find({}).sort({"date" : -1}).exec(function(err, data){
       res.json(data);
    });   
});

router.get("/search",function(req,res){
      feedSchemaModel.find({
        $text: {$search: req.query.q}
        
          }, function(err, data){
          res.json(data);
    });
})

router.get("/feeds/nodejs", function(req,res){
    feedSchemaModel.find({"category" : "nodejs"}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
    });
});

router.post("/feeds/nodejs", function(req,res){
    if(req.body.action === "delete"){
        let len = req.body.data.length;
        let selectedFeeds = req.body.data;
        for(let i = 0; i < len; i++){
            let selectedTitle = selectedFeeds[i].title;
            feedSchemaModel.findOneAndRemove({"title" : selectedTitle}, function(err){
                if(!err){
                    console.log("deleted");
                }
            });
        }
    }
    else if(req.body.action === "archive"){
        let len = req.body.data.length;
        let selectedFeeds = req.body.data;
        for(let i = 0; i < len; i++){
            let selectedTitle = selectedFeeds[i].title;
            feedSchemaModel.findOneAndUpdate({"title" : selectedTitle, "category" : "nodejs"}, { $set : {"archived" : true}}, function(err,doc){
                if(err){
                    console.log("Something gone wrong!!");
                }
                else{
                    console.log("updated succesfully");
                }
            });
        }
    }
});

router.get("/feeds/devops", function(req,res){
    feedSchemaModel.find({"category" : "devops"}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
    });
});

router.post("/feeds/devops", function(req,res){
    if(req.body.action === "delete"){
        let len = req.body.data.length;
        let selectedFeeds = req.body.data;
        for(let i = 0; i < len; i++){
            let selectedTitle = selectedFeeds[i].title;
            feedSchemaModel.findOneAndRemove({"title" : selectedTitle}, function(err){
                if(!err){
                    console.log("deleted");
                }
            });
        }
        res.send(req.body.data);
    }
    else if(req.body.action === "archive"){
        let len = req.body.data.length;
        let selectedFeeds = req.body.data;
        for(let i = 0; i < len; i++){
            let selectedTitle = selectedFeeds[i].title;
            feedSchemaModel.findOneAndUpdate({"title" : selectedTitle, "category" : "devops"}, { $set : {"archived" : true}}, function(err,doc){
                if(err){
                    console.log("Something gone wrong!!");
                }
                else{
                    console.log("updated succesfully");
                }
            });
        }
    }

});

router.get("/count", function(req,res){
    feedSchemaModel.count({}, function(err,total){
        res.json(total);
    });
});


router.get("/feeds/archived", function(req,res){
    feedSchemaModel.find({"archived" : true}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
    });
});



//////////// publishing API routes/////////////

router.get("/feeds/archived/nodejs", function(req,res){
    feedSchemaModel.find({"category" : "nodejs", "archived" : true}).sort({"date" : -1}).exec(function(err, data){
        res.json(data);
    });
});



module.exports = router;