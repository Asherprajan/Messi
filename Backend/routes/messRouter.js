const express = require("express");
const { resetpassword, login } = require("../controllers/messController");
const router = express.Router();


router.post("/login",login)
router.post("/reset-password",resetpassword)


const messrouter = router;
module.exports= messrouter