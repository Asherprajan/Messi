const Mess = require("../Model/MessOwnerModel");




const login = (req, res) => {
    const { email, password } = req.body;
  
    // Find the user with the provided email.
    const user = Mess.find((user) => user.email === email);
  
    if (!user) {
      // User not found, return an error response.
      return res.status(401).json({ message: "User not found" });
    }
  
    if (user.password !== password) {
      // Passwords don't match, return an error response.
      return res.status(401).json({ message: "Incorrect password" });
    }
  
    // If we reach this point, the login is successful.
    // You might generate a JWT token for the user here and return it for future authentication.
  
    res.status(200).json({ message: "Login successful" });
  };

  const resetpassword = (req, res) => {
    const { oldPassword, newPassword, phone, id } = req.body;
  
  
    Mess.findById(id, (err, messOwner) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
  
      if (!messOwner) {
        return res.status(404).json({ message: "Mess owner not found" });
      }
  
      if (messOwner.phone !== phone) {
        return res.status(401).json({ message: "Phone number does not match" });
      }
  
      if (messOwner.password !== oldPassword) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }
  
      messOwner.password = newPassword;
  
      messOwner.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Password update failed" });
        }
  
        res.status(200).json({ message: "Password reset successful" });
      });
    });
  };







  module.exports ={
     login,
     resetpassword


  }


