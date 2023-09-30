 const twillio =  require("twilio")
const accoutSid = process.env.accountSid 
const authToken = process.env.authToken
const twillioPhoneNmber = process.env.twilioPhoneNumber
const client = new twillio(accoutSid,authToken)


module.exports ={
    accoutSid,
    authToken
}

