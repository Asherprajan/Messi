const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {verifyUserToken} = require("../utils/jwt");


router.post("/registration", userController.registration);
router.get("/sendOtp",userController.sendOtp)
router.post("/verifyOtp",userController.verifyOTP)
router.post("/Login",userController.Login,verifyUserToken)
router.get("/logout",userController.logout)
router.get("/mess-owners",userController.listmess)
// Export the router as authRouter

const authRouter = router;
module.exports= authRouter
