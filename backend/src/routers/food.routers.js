const express = require("express");
const foodController  = require("../controllers/food.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const multer = require("multer");

const router = express.Router();


const upload = multer({storage:multer.memoryStorage(),})
router.post('/',authMiddleware.foodParnterMiddleware,upload.single("video"),foodController.createFood);
router.get('/',authMiddleware.getFoodItems,foodController.getFood);
router.get('/partner/videos',authMiddleware.foodParnterMiddleware,foodController.getPartnerFood);
module.exports = router;