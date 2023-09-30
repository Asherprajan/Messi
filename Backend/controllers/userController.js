const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const twillio = require("twilio");
require("dotenv").config()
const secretKey = "my-secret-key";
const jwte = require("../utils/jwt")
const jwt = require("jsonwebtoken")
const {sendRegistrationSuccessEmail} = require("../config/Nodemailer");
const Mess = require("../Model/MessOwnerModel");

const registration = async (req, res) => {
  try {
    console.log("1");

    const { name, password, phone,email } = req.body;
     const message = "You have sucessfully Registered!!"
    console.log(req.body);
    const existingUser = await User.findOne({ $or: [{ username: name }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or phone number already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: name, password: hashedPassword, phone,email });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 8600,
    });
    console.log("token send", token);
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiration
      httpOnly: true,
      sameSite: "lax",
    }).status(200).json({message : 'registration successfull...!'})

    sendRegistrationSuccessEmail(name,email)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred during registration" });
  }
};

const sendOtp = async(req,res)=>{
  const  phone = req.query.phone;
  const OTP = Math.floor(Math.random() * 9000) + 1000
  console.log(phone);
  console.log(OTP);
 
  const client = new twillio(process.env.accountSid, process.env.authToken);
 
  client.messages
    .create({
      body: `Hai we are from apr mess, Your OTP is ${OTP}`,
      from: process.env.twilioPhoneNumber,
      to: `+91${phone}`
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
 
  res.status(200).json({ success: true, otp: OTP });
 
 
 }

const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  const OTP = process.env.OTP;
  console.log(OTP);

  if (otp === OTP) {
    const token = jwt.sign({ userId: 1 }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ success: true, token });
  } else {
    res.redirect("/otp");
  }
};

// const resendOTP = async (req, res) => {
//   const { phone } = req.body;

//   const OTP = Math.floor(Math.random() * 100000);

//   const client = new twillio(process.env.accountSid, process.env.authToken);

//   client.messages
//     .create({
//       body: `Hai we are from apr mess, Your OTP is ${OTP}`,
//       from: process.env.twilioPhoneNumber,
//       to: phone
//     })
//     .then(message => console.log(message.sid))
//     .done();

//   res.status(200).json({ success: true, otp: OTP });
// };
const Login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({ error: 'Some of the fields are Empty' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid User' });
    }

    if (user.isDeleted) {
      return res.status(400).json({ error: 'Cannot access' });
    }

    if (user.isBlocked) {
      return res.status(400).json({ error: 'User is blocked' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwte.createUserToken(user._id);

    console.log('yes');
    res.json({
      success: true,
      token: token,
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res) => {
  console.log("hloo");
  // Clear the authentication token from cookies or local storage
  res.clearCookie("token"); // Assuming you used cookies for token storage

  res.status(200).json({ message: "Logout successful" });
};

    const listmess = async(req,res)=>{
      try {

        const mess = await Mess.find({isBlocked:false})
        return res.status(200).json(mess)
      } catch (error) {
        console.log(err);

        
      }
    }


module.exports = {
  registration,
  verifyOTP,
  sendOtp,
  Login,
  logout,
  listmess
};
