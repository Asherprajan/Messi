const mongoose = require('mongoose');

const MessOwnerSchema = new mongoose.Schema({
  messName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  identityProofDocs: [
    {
      type: String, // Assuming you store the file paths or URLs as strings
    },
  ],
  image: {
    type: String, // Assuming you store the file path or URL as a string
  },
  approvalStatus: {
    type: String, // You can use 'approved', 'pending', or other status values
    default: 'pending', // Set a default approval status if needed
  },
  menu: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
      },
      nonveg: {
        breakfast: String,
        lunch: String,
        dinner: String,
      },
      veg: {
        breakfast: String,
        lunch: String,
        dinner: String,
      },
    },
  ],
  subscribedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId, // Assuming you have a User model
      ref: 'User',
    },
  ],
  isBlocked: {
    type: Boolean,
    default: false, // Set to false by default; change to true if the user is blocked
  },
});

const Mess= mongoose.model('Mess', MessOwnerSchema);
module.exports =Mess;
