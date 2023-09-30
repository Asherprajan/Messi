const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username :{
        type:String,
        required : true

    },
    phone :{
        type : String,
        unique : true,
        required : true
    },
    password :{
        type: String,
        required : true

    },
    isBlocked :{
       type :Boolean,
       default:false
    },
    email :{
        type :String,
        required :true,
        unique :true

    },
    addresses: [
        {
          street: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true
          },
          country: {
            type: String,
            required: true
          },
          zipCode :{
            type :String,
            required : true,
            value:null
            

          }
        }
    ]
      

})
const User = mongoose.model('User',userSchema)
module.exports = User