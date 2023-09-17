const express = require('express');
const multer = require('multer');
const system = require("../../config/system")
const router = express.Router();
const storageMulter = require("../../helper/storageMulter");
const upload = multer({ storage: storageMulter() })

const validate = require("../../validates/admin/product.validate");
const controller = require("../../controllers/admin/product.controller.js")

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/delete/:id", controller.delete);
router.get(`/create`, controller.create);
router.post("/create",
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost
);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id',
    upload.single("thumbnail"),
    validate.createPost,
    controller.editPatch);

module.exports = router;