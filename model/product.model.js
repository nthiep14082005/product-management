const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ // ở đay tức là tạo mới 1 bộ khung có tên là productSchema
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt: Date // thêm trường deletedAt để kiểm tra thời gian xóa 
});

const Product = mongoose.model('Product', productSchema, "products"); // tham số thứ 3 là tên collection trong database 
// tức là nó sẽ đi vào database và tìm collection có tên là prodcuts và đặt tên là Product... 
// muốn dùng productSchema ta sử dụng lệnh như trên dòng 3



module.exports = Product;