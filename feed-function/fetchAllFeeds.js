const parser = require('rss-parser');
const feedSchemaModel = require("../models/schemas/FeedSchema");
const nodejsFunction = require("./nodejs_function");
const devopsFunction = require("./devops_function");
const productFunction = require("./product_function");
    function FetchAllFeeds(){

        // Number of sources for each category when 
        var nodejsFunctionCount = nodejsFunction.nodejsFunctionWhenDbIsEmpty.length;
        var devopsFunctionCount = devopsFunction.devopsFunctionWhenDbIsEmpty.length;
        var productFunctionCount =  productFunction.productFunctionWhenDbIsEmpty.length;

        feedSchemaModel.count({}, function(err, num){
                if(num === 0){
                        
                    for(let i = 0; i < nodejsFunctionCount; i++){
                        (nodejsFunction.nodejsFunctionWhenDbIsEmpty[i])();
                    }
                        
                    for(let i = 0; i < devopsFunctionCount; i++){
                        (devopsFunction.devopsFunctionWhenDbIsEmpty[i])();
                    }

                    for(let i = 0; i < productFunctionCount; i++){
                        (productFunction.productFunctionWhenDbIsEmpty[i])();
                    }


                }
            ///// below code runs for successive intervals 
            else{
                
                for(let i = 0; i < nodejsFunctionCount; i++){
                    (nodejsFunction.nodejsFunctionWhenDbIsNotEmpty[i])();
                }
            
                for(let i = 0; i < devopsFunctionCount; i++){
                    (devopsFunction.devopsFunctionWhenDbIsNotEmpty[i])();
                }

                for(let i = 0; i < productFunctionCount; i++){
                    (productFunction.productFunctionWhenDbIsNotEmpty[i])();
                }
            }
        });
            
            
        }

module.exports = FetchAllFeeds;