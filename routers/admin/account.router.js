const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/account.controller");
const validates = require("../../validates/admin/account.validate");

router.get("/", controller.index);
router.get("/create", controller.renderCreate);
router.post("/create",upload.single("avatar"), uploadCloud.uploads, validates.createPost, controller.createPost);

module.exports = router;