const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashboard); // -> khi truy cập link http://localhost:3000/admin/dashboard thì nó sẽ ra trang dashboard và khi truy cập http://localhost:3000/admin/dashboard/11 nó vẫn sẽ ra trang dashboard

module.exports = router;