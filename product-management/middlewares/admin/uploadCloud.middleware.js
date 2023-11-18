const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const systemConfig = require("../../config/system");
const uploadToCloudinary = require("../../helper/uploadToCloudinary");

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
// End cloudinary

module.exports.upload = async function (req, res, next) {
  try {
    if (req.file) {
      const link = await uploadToCloudinary(req.file.buffer);
      req.body[req.file.fieldname] = link;
    }
  } catch (error) {
    res.flash('error', "Lỗi dữ liệu vui lòng xác thực lại !");
    res.redirect(`back`);
  }
  next();
}