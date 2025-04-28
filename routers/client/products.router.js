const express = require("express");
const routers = express.Router();


const controller = require("../../controllers/client/product.controller")


routers.get('/', controller.product)

module.exports = routers;