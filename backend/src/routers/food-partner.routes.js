const express = require('express');
const router = express.Router();
import authMiddleware from '../middlewares/auth.middleware.js';
const foodPartnerController = require('../controllers/foodpartner.controller.js'); 

// Define food partner specific routes here

router.get("/food-partner/:id",authMiddleware.foodParnterMiddleware, foodPartnerController.getProfileId);

module.exports = router;