const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const waiterSchema=new Schema({
 
    W_Id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_no:{
        type: String
      
    },
    password:{
        type: String
     
        
    },
    status:{
        type: String
       
    }
})
const waiter = mongoose.model("waiter",waiterSchema);

module.exports=waiter;