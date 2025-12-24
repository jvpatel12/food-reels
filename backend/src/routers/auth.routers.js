const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.LogoutUser);

router.post("/foodpartner/register", authController.foodPaterRegister);
router.post("/foodpartner/login", authController.foodPaterLogin);
router.get("/foodpartner/logout", authController.LogoutPartner);
router.get("/foodpartner/profile", authMiddleware.foodParnterMiddleware, authController.getPartnerProfile);

module.exports = router;

