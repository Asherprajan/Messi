const express =  require("express")
const adminRouter = express.Router();
const {login,addmess, listMess, toggleBlockStatus, listUsers, BlockUsers}= require("../controllers/adminController");
const {upload}  = require('../config/Multer');



adminRouter.post("/adminlogin",login)
adminRouter.post("/add-mess",upload.single('image'), addmess); // Use "upload.single" for file upload
adminRouter.get("/mess-owners",listMess)
adminRouter.get("/blocked",toggleBlockStatus)
adminRouter.get("/listUsers",listUsers)
adminRouter.get("/block-user",BlockUsers)

 module.exports = adminRouter