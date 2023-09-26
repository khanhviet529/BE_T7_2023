const express = require('express');
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const router = express.Router();
const upload = multer();

const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/product.controller.js")

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete/:id", controller.delete);
router.get(`/create`, controller.create);
router.post("/create",
    upload.single("thumbnail"), uploadCloud.upload,
    validate.createPost,
    controller.createPost
);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id',
    upload.single("thumbnail"), uploadCloud.upload,
    validate.createPost,
    controller.editPatch);

router.get("/detail/:id", controller.detail);

module.exports = router;