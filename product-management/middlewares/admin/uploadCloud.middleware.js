const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const systemConfig = require("../../config/system");

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
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url;
      }
      await upload(req);
      next();
    }
    else {
      if (req.query.isData != "true") req.body[req.query.name] = '';
      next();
    }
  } catch (error) {
    res.flash('error', "Lỗi dữ liệu vui lòng xác thực lại !");
    res.redirect(`back`);
  }
}