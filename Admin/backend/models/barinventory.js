const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BarSchema = new Schema({

    Product_Code:{
        type:String,
        // required:true
    },
    Product_Name:{
        type:String,
        required:true
    },
    Product_Type:{
        type:String,
        required:true
    },
    Catogary:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
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
    ImageURL:{
        type:String,
        required:true
    }

});

const bar = mongoose.model("BarInventory",BarSchema);

module.exports = bar;