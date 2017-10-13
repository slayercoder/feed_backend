const parser = require('rss-parser');
const feedSchemaModel = require("../models/schemas/FeedSchema");
const nodejsFunction = require("./nodejs_function");
const devopsFunction = require("./devops_function");
function FetchAllFeeds(){
    var nodejsFunctionCount = nodejsFunction.nodejsFunctionWhenDbIsempty.length;
    var devopsFunctionCount = devopsFunction.devopsFunctionWhenDbisEmpty.length;
        
    feedSchemaModel.count({}, function(err, num){
            if(num === 0){
                    
                for(let i = 0; i < nodejsFunctionCount; i++){
                    (nodejsFunction.nodejsFunctionWhenDbIsempty[i])();
                }
                    
                for(let i = 0; i < devopsFunctionCount; i++){
                    (devopsFunction.devopsFunctionWhenDbisEmpty[i])();
                }

            }
        ///// below code runs for successive intervals 
        else{
            
            for(let i = 0; i < nodejsFunctionCount; i++){
                (nodejsFunction.nodejsFunctionWhenDbIsNotEmpty[i])();
            }
        
            for(let i = 0; i < devopsFunctionCount; i++){
                (devopsFunction.devopsFunctionWhenDbisNotEmpty[i])();
            }
        }
    });
           
        
    }

module.exports = FetchAllFeeds;