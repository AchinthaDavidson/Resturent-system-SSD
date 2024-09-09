const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const customerSchema=new Schema({
 
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
        type: String,
        required: true
    },
    password:{
        type: String,
        
    },
     date:{
        type: String,
        
    }

})
const customer = mongoose.model("customer",customerSchema);

module.exports=customer;