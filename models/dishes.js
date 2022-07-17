const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    names :{
        type : String,
        requried : true,
    },
    price : {
        type:Number,
        requried : true
    }
});
var Dishes = mongoose.model('NewDish',dishSchema);
module.exports = Dishes;