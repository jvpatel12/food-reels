const foodParnterModel = require("../model/foodpartner.model.js");

const jwt = require("jsonwebtoken");

async function foodParnterMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodParnterModel.findById(decoded.id);

   req.foodPartner = foodPartner;


    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

async function getFoodItems(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await foodParnterModel.findById(decoded.id);

   req.user = user;


    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}




module.exports  =  {foodParnterMiddleware,getFoodItems};