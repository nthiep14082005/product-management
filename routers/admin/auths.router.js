const express = require("express");
const multer = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");


router.get("/login", controller.login);
router.post("/login", validate.uploadLogin, controller.uploadLogin);

router.get("/logout", controller.logout);

module.exports = router;