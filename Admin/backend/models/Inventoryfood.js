const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventoryfoodSchema = new Schema({
    
    Item_Id: { 
        type: String, 
        required: true 
    },
    Quantity: { 
        type: Number, 
        required: true 
    },
    Unit_Price: { 
        type: Number, 
        required: true 
    },
    Supplier: { 
        type: String 
    },
    Expire_Date: { 
        type: String 
    },
    date: { 
        type: String 
    },
    time: { 
        type: String 
    },

});

const Inventoryfood = mongoose.model("Inventoryfood", InventoryfoodSchema);

module.exports = Inventoryfood;
