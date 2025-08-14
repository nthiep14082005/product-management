// bat dau bai 28 - nodejs - 28tech 1:15:00ph  -> để lưu được sản phẩm vào database thì đầu tiên phải tạo model vào sau khi tạo xong thì exports ra và trong controller thì sử dụng bằng cách gọi const Product = require(... đường dẫn của model cần lưu vào database ...)










const Product = require("../../model/product.model");
// [GET] /admin/products-category
module.exports.productsCategory = async (req, res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle_1: "Danh sách quản lý sản phẩm"
    });
}

// [GET] /admin/products-category/create

module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create", {
        pageTitle_1: "Tạo danh sách quản lý sản phẩm"
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // req.body.position = parseInt(req.body.position);

    // Tự động tăng position -> 28tech bài 24 - 0:35:00
    if(req.body.position == "") {
        const countProducts = await Product.countDocuments(); // -> Tự động tăng nếu người dùng ko nhập vị trí, dựa trên hàm countDocuments() của mongoose
        // console.log(countProducts);
        req.body.position = countProducts + 1;
    }else {
        req.body.position = parseInt(req.body.position);
    }
    // console.log(req.body);






    console.log(req.file); // -> bai 24 28tech 1:43:00 -> req.file là để xem trên form-data đã up lên file nào không, ví dụ ở bên fe kia đã up lên file ảnh nên nó sẽ hiển thị file ảnh và các thông tin của nó 
    // để hiển thị ảnh thì ta sẽ phải sử dụng đường dẫn như sau /upload/${req.file.filename} còn về tại sao mà không đi vào thư mục /public/upload/${req.file.filename} thì là do ta cài static: app.use(express.static("public")); nên nó sẽ bắt buộc phải đi trực tiếp từ /upload/${req.file.filename} bỏ qua public
    // hoặc ta có thể biết bằng cách khi console.log(req.file) thì để hiển thị ảnh lưu vào database thì ta sử dụng đường dẫn path và bỏ qua đường dẫn file đầu tiên -> lấy từ đường dẫn file từ thứ 2 trở đi 
    // if(req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;  // -> convert thumbnail sang req.file.filename chứ ko phải là req.file.originalname
    // };

    // http://localhost:3000/uploads/32618f5910de9b3d36405a3cc4a1fa67





    // Đưa vào database -> nodejs bài 24- 28tech -> 38ph 
    const product = new Product(req.body); // -> Tạo mới 1 sản phẩm rồi lưu req.body vào nhưng chưa đưa vào database mà chỉ lưu trữ trong code model
    await product.save(); // -> dùng .save(); để lưu vào database
    req.flash('success', `Thêm thành công sản phẩm`);
    
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}