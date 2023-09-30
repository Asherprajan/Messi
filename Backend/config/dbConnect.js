const mongoose = require("mongoose")
const dbConnect = ()=>{
    try {
        const connection  = mongoose.connect(process.env.MONGO_DB)
        console.log("Database Connected Sucessfully");
        
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports = dbConnect;