const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({

    Item_Id:{
        type:String,
        // required:true
    },
    Item_Name:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Total_Cost:{
        type:Number,
        required:true
    },
    Re_Order_Level:{
        type:String,
        required:true
    },
    unit :{
        type:String,
        required:true
    }

});

const Restaurant = mongoose.model("Restaurant",RestaurantSchema);

module.exports = Restaurant;