const foodModel = require("../model/food.model.js");
const {v4:uuid} = require("uuid");
const storageService  = require("../services/stroage.services.js");
async function createFood(req, res) {
     try {
          // Validate file exists
          if (!req.file) {
               return res.status(400).json({ error: "No video file provided" });
          }

          // Validate form data
          if (!req.body.name || !req.body.description) {
               return res.status(400).json({ error: "Name and description are required" });
          }

          console.log("📤 Uploading file:", req.file.originalname, "Size:", req.file.size);

          // Upload to ImageKit
          const fileuploadResult = await storageService.uplodImage(req.file.buffer, uuid());

          console.log("✅ ImageKit upload successful:", fileuploadResult.url);

          // Create food item in database
          const foodItem = await foodModel.create({
               name: req.body.name.trim(),
               description: req.body.description.trim(),
               video: fileuploadResult.url,
               foodParnter: req.foodPartner._id,
          });

          console.log("✅ Food item created:", foodItem._id);

          return res.status(201).json({
               message: "Food Item Created Successfully",
               food: foodItem,
          });
     } catch (error) {
          console.error("❌ Error in createFood:", error.message);
          console.error("Full error:", error);

          // Return specific error message
          const errorMessage = error.message || "Failed to upload food video";
          return res.status(500).json({ error: errorMessage });
     }
}


async function getFood(req, res) {
 
         const foodItems = await foodModel.find({}).populate("foodParnter");

         res.status(200).json({
                message:"Food Items fetched successfully",
                foodItems
         })
  

  
  
}

async function getPartnerFood(req, res) {
 
         const foodItems = await foodModel.find({foodParnter:req.foodPartner._id}).populate("foodParnter");

         res.status(200).json({
                message:"Partner Food Items fetched successfully",
                foodItems,
                partner:req.foodPartner
         })
}


module.exports = { createFood ,getFood, getPartnerFood};

