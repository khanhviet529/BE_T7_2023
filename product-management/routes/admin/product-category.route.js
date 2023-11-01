const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/product-category.controller");

const validate = require("../../validates/admin/product-category.validate");

// [GET] /admin/products-category
router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete/:id", controller.delete);

// [GET] /admin/products-category
router.get("/create", controller.create);

// [POST] /admin/product-category/create
router.post("/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  // validate.createPost,
  controller.createPost
);

// [GET] /admin/products-category/edit/:id
router.get("/edit/:id", controller.edit);

// [PATCH] /admin/products-category/edit/:id
router.patch("/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch);

module.exports = router;