const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/roles.controller");

router.get("/", controller.index);
router.get("/create", controller.renderCreate);
router.post("/create", controller.postCreate)

module.exports = router;