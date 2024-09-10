const router = require("express").Router();
let faq = require("../models/faq");

//create

router.route("/add").post((req,res) =>{

    const category = req.body.category;
    const question = req.body.question;
    const answer = req.body.answer;

    const newFaq = new faq({

        category,
        question,
        answer

    })

    newFaq.save().then(() =>{
        res.json("New FAQ added");
    }).catch((err) =>{
        console.log(err);
    })

})



//Read

router.route("/").get((req,res) =>{

    faq.find().then((faq) =>{
        res.json(faq)
    }).catch((err) =>{
        console.log(err)
    })
})

//Update

router.route("/update/:id").put(async(req,res)=>{
    let fId = req.params.id;
    const {category, question, answer} = req.body;

    const updateFaq = {
        category, 
        question,
        answer
    }

    const update = await faq.findByIdAndUpdate(fId, updateFaq).then(() =>{
        res.status(200).send({status: "FAQ updates"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Failed to update"})
    })
})


//Delete

router.route("/delete/:id").delete(async(req,res) =>{

    let fid = req.params.id;

    await faq.findByIdAndDelete(fid).then(() =>{
        res.status(200).send({status: "FAQ delete"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Failed to delete FAQ"});
    })
})



module.exports = router;