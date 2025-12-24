const foodParnterModel =  require("../model/foodpartner.model.js");

async function getProfileId(req,res){
    const foodPartnerId = req.params.id;

    try {
        const foodPartner = await foodParnterModel.findById(foodPartnerId).select("-password"); // Exclude password field

        if (!foodPartner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }

        return  res.status(200).json({
            message: "Food Partner profile fetched successfully",
            foodPartner
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }   

}

exports.module = {getProfileId};