const router = require('express').Router();
let Bar = require('../models/barinventory');
const barInv = require('../models/barinventory_data');

/* add */
router.route("/add").post((req,res)=>{
console.log("add methodc called")

    const Product_Code = req.body.code;
    const Product_Name = req.body.name;
    const Product_Type = req.body.type; 
    const Catogary = req.body.catogary;
    const Quantity = req.body.quantity;
    const Total_Cost = Number(req.body.newTotCost);
    const Re_Order_Level = req.body.Reorderlevel;
    const ImageURL = req.body.Location;

    // const Product_Name = 'req.body.name';
    // const Product_Code = 'req.body.code';
    // const Product_Type = 'req.body.type'; 
    // const Catogary = 'req.body.catogary';
    // const Quantity = 'req.body.quantity';
    // const Total_Cost = 'req.body.Buycost';
    // const Re_Order_Level = 'req.body.Reorderlevel';
    // const ImageURL = 'req.body.ImageURL';

    const newbar = new Bar({
        Product_Code,
        Product_Name,
        Product_Type,
        Catogary,
        Quantity,
        Total_Cost,
        Re_Order_Level,
       ImageURL
    })
    console.log(newbar);

    newbar.save().then(()=>{
        res.json("Bottle added");
    }).catch((err)=>{
        console.log(err);
    })
})

/* update */
router.route("/update/:id").put(async(req,res)=>{

    let userid = req.params.id;

   // const Product_Code = req.body.code;
    const Product_Name = req.body.name;
    const Product_Type = req.body.type; 
    const Catogary = req.body.catogary;
    const Quantity = req.body.quantity2;
    const Total_Cost = Number(req.body.Totalcost2);
    const Re_Order_Level = req.body.Reorderlevel;

    // const Product_Name = 'req.body.name';
    // const Product_Type = 'req.body.type'; 
    // const Catogary = 'req.body.catogary';
    // const Quantity = 'req.body.quantity';
    // const Total_Cost = 'req.body.Totalcost';
    // const Re_Order_Level = 'req.body.Reorderlevel';

    const updatebar = {Product_Name,Product_Type,Catogary,Quantity,Total_Cost,Re_Order_Level};

    await Bar.updateOne({Product_Code:userid},{$set:updatebar})
    .then(()=>{
        res.status(200).send({status:"bar inventory updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"bar inventory update failed", error:err});
    })
})


/*delete*/
// router.route("/delete/:id").delete(async(req,res)=>{
    
//     let userid = req.params.id;

//     await barInv.findByIdAndDelete(userid).then(()=>{
//         res.status(200).send({status:"bar detail deleted", user : userid})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"bar detail delete failed", error:err});
//     })
// })

/* display*/
router.route("/").get((req,res)=>{

    Bar.find().sort({Product_Name:1}).then((bars)=>{
        res.json(bars)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update1/:id").post(async(req,res)=>{
    let Id = req.params.id;

    // const Quantity = 10;
    // const Total_Cost = 6000;

    const Quantity = req.body.Quantity1;
    const Total_Cost = req.body.cost;


    Bar.find({Product_Code:req.params.id}).then((barinventory)=>{
        var Quantity1 = barinventory[0].Quantity
        var cost1 = barinventory[0].Total_Cost

        update2(Quantity1,cost1)
        // console.log(barinventory);
    }).catch((err)=>{
        console.log(err);
    })

    function update2(qty,cost3){
        var quantity3 = Number(qty-Quantity)
        var Total_Cost3 = Number(cost3-Total_Cost)

        Bar.updateOne({Product_Code:Id},{$set:{Quantity:quantity3,Total_Cost:Total_Cost3}})
        .then(()=>{
            res.status(200).send({status:"bar inventory updated"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"bar inventory update failed", error:err});
        })
    }
})



/* display*/

router.route("/viewbarInventory").get((req,res)=>{


})

router.route("/sum/").get((req,res)=>{
   
    Bar.aggregate([{$group:{_id:null ,price:{$sum: "$Total_Cost"}}}]).then((Bar)=>{
                res.json(Bar)
            }).catch((err)=>{
                console.log(err)
            })
        })



router.route("/updateqty").post(async(req,res)=>{

            const Id = req.body.list;
            console.log("update")
            console.log(Id);
        //  for(let i=0;i<Id.length;i++){
         
        //          food.find({_id:Id[i].Iid}).then((food)=>{
        //           const Ingridients=food[0].Ingridients;
                
        //           console.log("hi")
                  
        //           Ingridient(Ingridients,Id[i].quantity)
        //          //  console.log(food[0].Ingridients)
         
        //          }).catch((err)=>{
        //              console.log(err)
        //          })
        //      }
         
    
             for(let i=0;i<Id.length;i++){
             
                 // console.log("hi")
         
                 Bar.find({Product_Code:Id[i].description}).then((Bar)=>{
                    const  Quantity1 =Bar[0].Quantity
                 
             
                     update2(Quantity1,Id[i].quantity,Id[i].description)
                     console.log(Quantity1)
                     
                 }).catch((err)=>{
                     console.log(err)
                 })
             
             }  
       
             function update2(qty,Quantity,id){
                 var Quantity3=Number(qty-Quantity)
         
               
          
                  Bar.updateOne({Product_Code:id},{$set:{Quantity:Quantity3}})
          
                  .then(()=>{
                     //  res.status(200).send({status:"bar inventory updated"})
                      console.log("rtgdrg");
                  }).catch((err)=>{
                      console.log(err);
                      res.status(500).send({status:"bar inventory update failed", error:err});
                  })
                  
              }
         
         });
module.exports = router;
