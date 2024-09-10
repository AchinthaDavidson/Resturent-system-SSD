const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BarInvSchema = new Schema({

    Product_Code:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Expire_Date:{
        type:String,
        required:true
    },
    Unit_Cost:{
        type:Number,
        required:true
    },

    Sell_Price:{
        type:String,
        required:true
    },
    Buy_Date:{
        type:String,
        // required:true
    },
    time:{
        type:String,
        // required:true
    }
});

const barinv = mongoose.model("BarInv",BarInvSchema);

module.exports = barinv;