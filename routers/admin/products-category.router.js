const express = require("express"); // -> câu lệnh bắt buộc phải có trong file router độc lập 
const multer = require("multer");
const router = express.Router(); // -> câu lệnh bắt buộc phải có trong file router độc lập 


const upload = multer();
const validates = require("../../validates/admin/product-category.validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/products-category.controller");


router.get("/", controller.productsCategory);
router.get("/create", controller.create);
router.post("/create",upload.single("thumbnail"),uploadCloud.uploads, validates.createPost, controller.createPost);

module.exports = router; // -> câu lệnh bắt buộc phải có trong file router độc lập 