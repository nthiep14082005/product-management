const express = require("express");
const routers = express.Router();


const productController = require('../../controllers/client/product.controller');


routers.get('/', productController.product)

// router.get slug detail
routers.get("/:slug", productController.detail) // bởi vì slug là giá trị động tương tự như :id nên phải có : trước

module.exports = routers;