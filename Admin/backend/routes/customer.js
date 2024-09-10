const router = require("express").Router();

let Customer =require("../models/customer");


// ADD coustomer
router.route("/add").post((req,res)=>{

    console.log("hi");
    const  name     =req.body.name;
    const  Email    =req.body.email;
    const  address  =req.body.address;
    const  phone_no =req.body.phone;
    const  password =req.body.pasword;
    
    // const  name     ="isuru"
    // const  Email    ="isu@gmail.com"
    // const  address  ="191 katugastota Rd kandy"
    // const  phone_no =718922774
    // const  password ="xghch123"

    const newCustomer =new  Customer({
    
        name, 
        Email,   
        address, 
        phone_no,
        password
    })

    newCustomer.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})
// show
router.route("/").get((req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/count").get((req,res)=>{
    Customer.count().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        console.log(err)
    })
})
// update
// router.route("/update/:id").put(async(req,res)=>{
//     let userId=req.params.id;

//     const {name , email, address, phone_no, password}=req.body;
   
//     const updatecustomer={
//         name, 
//         email,   
//         address,     
//         phone_no,
//         password
//     }

//     const update=await Customer.findByIdAndUpdate(userId,updatecustomer)
//     .then(()=>{
//         res.status(200).send({status:"user update",user: update}) 

//     }).catch((err)=>{
//         console.log (err);
//     })


// })

// delete
// router.route("/delete/:id").delete(async(req,res)=>{

//     let userId=req.params.id;

//     await Customer.findByIdAndDelete(userId)
//     .then(()=>{
//             res.status(200).send({status:"user deleted"});
//     }).catch((err)=>{
//             res.status(500).send({status:"error deleted"});
//     })

// })
// show by id
// router.route("/get/:id").get(async(req,res)=>{
//     let userId=req.params.id;
//     const user= await Coustomer.findById(userId)

//     .then(()=>{
//         res.status(200).send({status:"user fetch",data:user});
//     }).catch((err)=>{
//         res.status(500).send({status:"error "});
//     })
// })

module.exports=router;