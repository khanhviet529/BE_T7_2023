const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/product-category.controller");

const validate = require("../../validates/admin/product-category.validate");

// [GET] /admin/product-category
router.get("/", controller.index);

// [GET] /admin/product-category
router.get("/create", controller.create);

// [POST] /admin/product-category/create
router.post("/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  // validate.createPost,
  controller.createPost
);

module.exports = router;