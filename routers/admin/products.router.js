const express = require("express");
const router = express.Router();


// multer
const multer  = require('multer'); // nhúng multer để upload định dạng file 
const storageMulter = require('../../helpers/storageMulter.js');
const upload = multer({ storage: storageMulter() }); // đường dẫn để lưu ảnh vào đâu thư mục uploads trong public 


const controller = require("../../controllers/admin/products.controller");
router.get("/",controller.products); 

router.patch("/change-status/:status/:id", controller.changeStatus); // -> ta dùng :status và :id là để truyền dâta động khi mà trên thanh url cần truyền vào và nó có thể tự thay đổi dựa trên dữ liệu mình truyên vào
// -> khi thay đổi PATCH thì bên này đoạn truyền URL động ở bên trên ta chưa đổi thành phương thức PATCH mà đagn để GET

router.patch("/change-multi", controller.changeMulti);
// router.patch("/changeMulti/products", controller.change_multi); // test thay vì sử dụng form + input thì dùng form + js



// router.delele delete
// router.delete("/delete-product/:id", controller.deleteProduct);
// router.delele sử dụng updateOne
router.delete("/delete-product/:id", controller.deleteProduct_PATCH);
// router.delete multi
router.delete("/delete-multi", controller.changeDeleteMulti);

// router.get create
router.get("/create", controller.create); // render ra trang tạo sản phẩm 
router.post("/create",upload.single("thumbnail") , controller.createPost); // up sản phẩm lên giao diện, Thêm hàm upload.singer("thumbnail") để upload ảnh 


// thêm multer -> bởi vì khi đọc docx của nó thì nó xử lý ở phần router nên phần require('multer) cũng phải require trong router


module.exports = router;


// file này dùng để chuyển hướng nếu có request đến thì chạy sang controller để xử lý

// làm phần tìm kiếm bài 21 - 28tech nodejs 5ph