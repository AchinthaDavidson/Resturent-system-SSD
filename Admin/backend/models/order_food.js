const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const order_foodSchema=new Schema({
 
    food_id:{
        type: String,
        required: true
    },
    order_id:{
        type: String,
        required: true
    },
    qty:{
        type: String,
        required: true
    },
   
    
})
const order_food = mongoose.model("order_food",order_foodSchema);

module.exports=order_food;