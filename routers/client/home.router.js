


const express = require("express")
const routers = express.Router();
// express.Router() tạo một đối tượng router độc lập để tổ chức các tuyến đường (routes) một cách có cấu trúc hơn.


const controller = require("../../controllers/client/home.controller")
// Module home.controller.js được nhập từ thư mục controllers/client. Nó chứa logic xử lý khi có yêu cầu đến route này.



routers.get('/', controller.index) 
// Khi có một yêu cầu GET tới '/', nó sẽ gọi phương thức index trong controller.


module.exports = routers;