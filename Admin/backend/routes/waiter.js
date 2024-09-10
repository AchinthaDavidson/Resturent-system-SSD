const router = require("express").Router();
const waiter = require("../models/waiter");

router.route("/add").post((req,res)=>{

   
    const W_Id = req.body.id
    const  name = req.body.name
    const  Email    = req.body.email
    const  address  = req.body.address
    const  phone_no     = req.body.phone
    const  password     = req.body.password
    const  status    = req.body.status

    const newwaiter =new  waiter({
        W_Id,
        
        name,
        Email,   
        address, 
        phone_no,
        password,
        status     
    })

    newwaiter.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    waiter.find().then((waiter)=>{
        res.json(waiter)
    }).catch((err)=>{
        console.log(err)
    })
})

//****** */

router.put("/update/:id" , async(req,res)=>{

    let userID = req.params.id

    const {
        W_Id,
         name,
         Email,   
        address, 
        phone_no,
        password,
        status } = req.body

    const updateWaiter = {
        name,Email,address, phone_no, password, status ,  W_Id
    }

    const update = await waiter.findByIdAndUpdate(userID , updateWaiter)
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

    await waiter.findByIdAndDelete(userID)
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

    waiter.findById(id).then((waiter)=>{
        res.json(waiter)
    }).catch((err)=>{
        console.log(err)
    })
})



//******** */
module.exports=router;