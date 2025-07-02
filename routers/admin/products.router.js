const express = require("express");
const router = express.Router();

// nhúng validates
const validates = require("../../validates/admin/product.validate.js"); // nhúng validates để kiểm tra dữ liệu trước khi gửi lên database

// multer
const multer  = require('multer'); // nhúng multer để upload định dạng file 
// -> sử dụng 2 câu lệnh dưới đây để up file lên cloud tĩnh bằng nodejs -> bài 27 25:00ph -> 28tech nodejs
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
// -- sau đó mới khai báo storageMulter và upload 
const storageMulter = require('../../helpers/storageMulter.js');
// const upload = multer({ storage: storageMulter() }); // đường dẫn để lưu ảnh vào đâu thư mục uploads trong public 
// -> còn nếu ko cần lưu ảnh vào file upload trong public mà lưu trên cloud thì ta dùng như sau 
const upload = multer();
// Cấu hình cloudinary truy cập vào tài khoản
cloudinary.config({
    cloud_name: 'dletlqryn',
    api_key: '345843193316182',
    api_secret: 'p08cIStrqn5x2-3VlDAOQdThmsI'
});
// end



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
                async function (req, res, next) { // -> câu lệnh trong hướng dẫn đẩy cloud tĩnh -> https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
                    if(req.file) {
                        let streamUpload = (req) => { // -> giải thích đoạn câu lệnh này ở bài 27 30:00 28tech nodejs
                        return new Promise((resolve, reject) => {
                            let stream = cloudinary.uploader.upload_stream(
                                (error, result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject(error);
                                    }
                                }
                            );
                        
                            streamifier.createReadStream(req.file.buffer).pipe(stream);
                        });
                    };
                
                    async function upload(req) {
                        let result = await streamUpload(req);
                            // console.log(result);
                            // req.body.thumbnail = result.secure_url;
                            // tương tự
                            req.body[req.file.fieldname] = result.secure_url; // -> ở đây thay vì sử dụng thumbnail thì ta dùng như kia để nhỡ có thay đổi thì ko sao 
                            next();                        
                        }
                        
                        upload(req);
                    } else {
                        next();  // ->> bài 27 nodejs 28tech 52:00 -> giải thích về tính chất next và async await và tại sao lại chạy vào controller trước khi upload ảnh 
                    }
                },
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
                async function (req, res, next) { // -> câu lệnh trong hướng dẫn đẩy cloud tĩnh -> https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
                    if(req.file) {
                        let streamUpload = (req) => { // -> giải thích đoạn câu lệnh này ở bài 27 30:00 28tech nodejs
                        return new Promise((resolve, reject) => {
                            let stream = cloudinary.uploader.upload_stream(
                                (error, result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject(error);
                                    }
                                }
                            );
                        
                            streamifier.createReadStream(req.file.buffer).pipe(stream);
                        });
                    };
                
                    async function upload(req) {
                        let result = await streamUpload(req);
                            // console.log(result);
                            // req.body.thumbnail = result.secure_url;
                            // tương tự
                            req.body[req.file.fieldname] = result.secure_url; // -> ở đây thay vì sử dụng thumbnail thì ta dùng như kia để nhỡ có thay đổi thì ko sao 
                            next(); // chỉ gọi next ở đây nếu có file -> bản chất async await có tính chất chờ đợi nên nếu ko có next thì nó ko chạy tiếp được middleware sau 
                        }
                        
                        upload(req);
                    } else {
                        // chỉ gọi next ở đây nếu không có file
                        next();  // ->> bài 27 nodejs 28tech 52:00 -> giải thích về tính chất next và async await và tại sao lại chạy vào controller trước khi upload ảnh 
                    }


                    
                    // giải thích về async await ngắn gọn 
//                             Giải thích dễ hiểu về hai trường hợp dùng next() trong middleware upload ảnh:
// TH1: Dùng if...else (dòng 118 và 124)
// if (req.file) {
//     // Có file upload
//     async function upload(req) {
//         // Chờ upload ảnh lên cloud xong
//         next(); // Dòng 118: chỉ gọi next() khi upload xong
//     }
//     upload(req);
// } else {
//     // Không có file upload
//     next(); // Dòng 124: gọi next() luôn để chuyển sang middleware tiếp theo
// } 
                    // Ý nghĩa:
                    // Nếu có file: Chờ upload xong mới next() → Đảm bảo middleware sau chỉ chạy khi đã có link ảnh.
                    // Nếu không có file: next() luôn → Middleware sau chạy ngay.
                    // next() chỉ được gọi đúng 1 lần cho mỗi request, không bị lặp.
// ====================================================================================
// TH2: Không có if...else, chỉ gọi next() sau upload(req)
// async function upload(req) {
//     // ...chờ upload xong (nếu có file)...
// }
// upload(req);
// next();
//                     Ý nghĩa:
//                     upload(req) là hàm async, nhưng không có await ở ngoài, nên upload(req) chạy song song, không chờ upload xong đã gọi next().
//                     Kết quả: Middleware tiếp theo chạy NGAY, có thể chạy trước khi upload xong, dẫn đến lỗi (chưa có link ảnh, dữ liệu chưa đúng).
//                     Nếu upload(req) bị lỗi (ví dụ không có file), vẫn gọi next() nên có thể gây bug hoặc crash.








                },
                validates.createPost, // kiểm tra dữ liệu trước khi gửi lên database
                controller.createPost); // up sản phẩm lên giao diện, Thêm hàm upload.singer("thumbnail") để upload ảnh 
// thêm multer -> bởi vì khi đọc docx của nó thì nó xử lý ở phần router nên phần require('multer) cũng phải require trong router


module.exports = router;
// Khi bạn viết const router = express.Router();, bạn tạo ra một router riêng để định nghĩa các đường dẫn (route) cho module này -> module.exports = router; sẽ xuất router này ra ngoài.
// file này dùng để chuyển hướng nếu có request đến thì chạy sang controller để xử lý

// làm phần tìm kiếm bài 21 - 28tech nodejs 5ph