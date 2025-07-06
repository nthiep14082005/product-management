const express = require("express");
const router = express.Router();

// nhúng validates
const validates = require("../../validates/admin/product.validate.js"); // nhúng validates để kiểm tra dữ liệu trước khi gửi lên database

// multer
const multer  = require('multer'); // nhúng multer để upload định dạng file 
// -> sử dụng 2 câu lệnh dưới đây để up file lên cloud tĩnh bằng nodejs -> bài 27 25:00ph -> 28tech nodejs
// const cloudinary = require('cloudinary').v2;
// const streamifier = require('streamifier');
// -- sau đó mới khai báo storageMulter và upload 
const storageMulter = require('../../helpers/storageMulter.js');
// const upload = multer({ storage: storageMulter() }); // đường dẫn để lưu ảnh vào đâu thư mục uploads trong public 
// -> còn nếu ko cần lưu ảnh vào file upload trong public mà lưu trên cloud thì ta dùng như sau 
const upload = multer();
// // Cấu hình cloudinary truy cập vào tài khoản
// cloudinary.config({
//     cloud_name: 'dletlqryn',
//     api_key: '345843193316182',
//     api_secret: 'p08cIStrqn5x2-3VlDAOQdThmsI'
// });
// // end

// middleware uploadCLoud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

const controller = require("../../controllers/admin/products.controller");
router.get("/",controller.products); 

router.patch("/change-status/:status/:id", controller.changeStatus); // -> ta dùng :status và :id là để truyền dâta động khi mà trên thanh url cần truyền vào và nó có thể tự thay đổi dựa trên dữ liệu mình truyên vào
// -> khi thay đổi PATCH thì bên này đoạn truyền URL động ở bên trên ta chưa đổi thành phương thức PATCH mà đagn để GET

router.patch("/change-multi", controller.changeMulti);
// router.patch("/changeMulti/products", controller.change_multi); // test thay vì sử dụng form + input thì dùng form + js


// router.get edit-item
router.get("/edit-item/:id", controller.renderEditItems);
// router.patch edit-item -> ?_method=PATCH ở router.patch này được dùng ở trong file E:\New folder\product-management\views\admin\pages\products\edit-items.pug
router.patch("/edit-item/:id", 
                upload.single("thumbnail"), // -> sử dụng multer
                uploadCloud.uploads,
                validates.createPost,
                controller.editItems);


// router.get detail-item
router.get("/detail-item/:id", controller.detailsItem)

// router.delele delete
// router.delete("/delete-product/:id", controller.deleteProduct);
// router.delele sử dụng updateOne
router.delete("/delete-product/:id", controller.deleteProduct_PATCH);
// router.delete multi
router.delete("/delete-multi", controller.changeDeleteMulti);

// router.get create
router.get("/create", controller.create); // render ra trang tạo sản phẩm 
// 1:03:00 sử dụng middleware để kiểm tra require khi validates title ở validates.js trước sau đó mới đi vào controller createPost
// sau khi render trang giao diện thì dùng get nhưng khi muốn upload các thứ lên thì dùng post và đều chung đường dẫn nhưng khác controller
router.post("/create",
                upload.single("thumbnail"), // -> sử dụng multer
                uploadCloud.uploads,
                validates.createPost, // kiểm tra dữ liệu trước khi gửi lên database
                controller.createPost); // up sản phẩm lên giao diện, Thêm hàm upload.singer("thumbnail") để upload ảnh 
// thêm multer -> bởi vì khi đọc docx của nó thì nó xử lý ở phần router nên phần require('multer) cũng phải require trong router


module.exports = router;
// Khi bạn viết const router = express.Router();, bạn tạo ra một router riêng để định nghĩa các đường dẫn (route) cho module này -> module.exports = router; sẽ xuất router này ra ngoài.
// file này dùng để chuyển hướng nếu có request đến thì chạy sang controller để xử lý

// làm phần tìm kiếm bài 21 - 28tech nodejs 5ph