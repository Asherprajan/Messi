const cloudinary =  require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'dl5xjs2kt', 
    api_key: '242843343214259', 
    api_secret: 'LuLxJ_WwG1PZv-PHyjbl2KpRBI8' 
  });



// Function to save an image to Cloudinary
const saveImageToCloudinary = async (imageFile) => {
  try {
    const result = await cloudinary.uploader.upload(imageFile, {
 
    });

   
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  saveImageToCloudinary,
};