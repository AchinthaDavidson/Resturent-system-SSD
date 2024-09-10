const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const driverSchema=new Schema({
 
    D_Id:{
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
        type: String,
        required: true
    },
    password:{
        type: String,
        
    }
})
const driver = mongoose.model("driver",driverSchema);

module.exports=driver;