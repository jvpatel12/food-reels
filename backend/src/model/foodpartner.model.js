const mongoose = require("mongoose");


const footPartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
})

const foodPartnerModel = mongoose.model("FoodParnter",footPartnerSchema);

module.exports = foodPartnerModel;