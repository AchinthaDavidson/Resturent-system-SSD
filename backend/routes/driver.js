const router = require("express").Router();
const driver = require("../models/driver");
router.route("/add").post((req,res)=>{

    console.log("hello");
    const D_Id=req.body.id
    const  name =req.body.name
    const  Email    =req.body.email
    const  address  =req.body.address
    const  phone_no     = req.body.phone_no
    const  password     =req.body.password

    // const order_id ='1';
    // const  w_id     ="vsfgsg"
    // const  cus_id   ="dfxhfh"
    // const  type     ="takeaway"
   
    // const  date     =d.getUTCDate()+"/"+d.getUTCMonth()+1+"/"+d.getFullYear();
    // const  time     =d.getHours()+":"+d.getMinutes()

    const newdriver =new  driver({
        D_Id,
        name,
        Email,   
        address, 
        phone_no,
        password  
    })

    newdriver.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    driver.find().then((driver)=>{
        res.json(driver)
    }).catch((err)=>{
        console.log(err)
    })
})

router.put("/update/:id" , async(req,res)=>{

   

    const { name,
        Email,   
        address, 
        phone_no,
        password } = req.body

    const updatedriver = {
        name,Email,address, phone_no, password
    }

    const update = await driver.findByIdAndUpdate(userID , updatedriver)
    .then(()=>{
        res.status(200).send({Status : 'User updated' })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send({status : "error with update user" , error : err.message})
    })

   
})

router.delete('/delete/:id' , async (req,res)=> {
    let userID = req.params.id

    await driver.findByIdAndDelete(userID)
    .then(()=>{
        res.status(200).send( {Status : "deleted"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send({status : "error with delete user" , error : err.message})
    })

})

router.route("/:id").get((req,res)=>{

    let id = req.params.id

    driver.findById(id).then((driver)=>{
        res.json(driver)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports=router;