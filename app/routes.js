const express = require("express");
const router = express.Router();
const path = require("path");
const Nodejs = require("../models/schemas/Nodejs");
const Devops = require("../models/schemas/Devops");

// categories function imports
const Node_Category = require("../feed-function/nodejs_function");
const Devops_Category = require("../feed-function/devops_function");



router.get("/", function(req,res){
    Node_Category();
    Devops_Category();
});

router.get("/feeds/nodejs", function(req,res){
    Nodejs.find({"category" : "nodejs"}, function(err, data){
        res.json(data);
    });
});

router.get("/feeds/devops", function(req,res){
    Devops.find({"category" : "devops"}, function(err, data){
        res.json(data);
    });
});

router.get("/count", function(req,res){
    var tot = 0;
    Nodejs.count({}, function(err,cnt){
        tot += cnt;
        Devops.count({}, function(err,cnt){
            tot += cnt;
            res.json(tot);
        });
    });
});


module.exports = router;