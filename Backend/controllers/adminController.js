// imprts

const jwt = require("../utils/jwt");
const adminModel = require("../Model/adminModel");
const { saveImageToCloudinary } = require("../cloudinary/Image");
const bcrypt = require("bcrypt"); // for password hashing
const Mess = require("../Model/MessOwnerModel");
const { sendMessOwnerRegistrationemail } = require("../config/MessOwnermail");
const Messs = require("../Model/MessOwnerModel");
const User = require("../Model/userModel");

// functions

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: "Admin not found" });
    }

    if (password !== admin.password) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    res.json({
      success: true,
      admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const addmess = async (req, res) => {
  try {
    console.log("hello");

    const randomPassword = generateRandomPassword();
    const imageFile = req.file;
    console.log("aaaa", imageFile);

    if (!imageFile) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const imageUrl = await saveImageToCloudinary(imageFile.path);

    const { name, location, phone, email, identityproof } = req.body;
    console.log("7", req.body);

    console.log("name", name);

    const newMess = new Messs({
      messName: name,
      location,
      phone,
      password: await hashPassword(randomPassword),
      email,
      identityProofDocs: identityproof,
      image: imageUrl,
    });

    const savedMess = await newMess.save();

    res.status(200).json({
      message: "Mess owner added successfully",
      mess: savedMess,
      password: randomPassword,
    });
    sendMessOwnerRegistrationemail(name, email, randomPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function generateRandomPassword() {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

const listMess = async (req, res) => {
  try {
    const messes = await Messs.find();

    return res.status(200).json(messes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleBlockStatus = async (req, res) => {
  try {
    console.log("1");
    const userId = req.query.id;
    console.log(userId);

    // Find the user by ID
    const user = await Mess.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the isBlocked field
    user.isBlocked = !user.isBlocked;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
   const BlockUsers = async(req,res)=>{
    try {
        
    const userId = req.query.id;
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    return res.status(200).json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user: user,
    });


        
    } catch (error) {
        return  res .status(500).json({message:"Internal server error",error:error.message})
        
    }
   }

module.exports = {
  login,
  addmess,
  listMess,
  toggleBlockStatus,
  listUsers,
  BlockUsers
};
