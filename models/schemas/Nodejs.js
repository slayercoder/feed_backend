const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Nodejs = new Schema({
    title : {type : String, required : true },
    description : {type : String, required : true},
    date : {type : Date},
    link : {type : String, required : true},
    creator : {type : String, required : true},
    // media_url : {type : String, required : true},
    category : {type : String, required : true}
});


var Nodejs = mongoose.model("node", Nodejs);

module.exports = Nodejs;