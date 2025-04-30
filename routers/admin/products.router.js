const express = require("express");
const router = express.Router();

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



module.exports = router;


// file này dùng để chuyển hướng nếu có request đến thì chạy sang controller để xử lý

// làm phần tìm kiếm bài 21 - 28tech nodejs 5ph