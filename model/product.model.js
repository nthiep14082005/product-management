const mongoose = require("mongoose");

// cài đặt và nhúng slug
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({ // ở đay tức là tạo mới 1 bộ khung có tên là productSchema
    title: String, //-> ví dụ title là sản phẩm 11
    product_category_id: {
        type: String,
        default: ""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number, // ví dụ ở đây nó tự hiểu là truyền vào kiểu type: Number
    slug: { 
        type: String, 
        slug: "title", // tự động chuyển đổi thành //        /san-pham-11 
        unique: true   //  để slug là duy nhất, Không được trùng slug nếu title giống nhau -> slug duy nhất 
    },
    createdBy: { // -> nếu lưu dưới dạng object như này thì chỉ lưu được 1 người 
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    
    updatedBy: [ // -> lưu dưới dạng object thì chỉ lưu được 1 người , muốn lưu nhiều người thì dùng array
        { 
            account_id: String,
            updatedAt: Date
        },
    ]
    ,
    deleted: { // Ta nên truyền vào dạng object co 2 dạng là type: Boolean tức là kiểu là Boolean nếu người dùng truyền vào, còn nếu ko truyền vào thì có kiểu mặc định được set sẵn là false
        type: Boolean,
        default: false
    },
    deletedBy: {
        account_id: String,
        deletedAt: {
            type: Date,
            default: Date.now
        }
    },
}, {timestamps: true}); // bai24 - 28tech - 46ph trong mongoose có sẵn 1 tham số còn lại là timestamps, trong timestamps sẽ 2 thuộc tính là createAt: và updateAt -> nó sẽ tự động update thời gian khi mà nó phát hiện có bản ghi mới được tạo hoặc bản ghi được chỉnh sửa, thay vì khởi tạo thủ công 2 thuộc tính thì ta dùng true nó sẽ tự động khởi tạo

const Product = mongoose.model('Product', productSchema, "products"); // tham số thứ 3 là tên collection trong database 
// tức là nó sẽ đi vào database và tìm collection có tên là prodcuts và đặt tên là Product... và gán cho database một model cố định là productSchema
// muốn dùng productSchema ta sử dụng lệnh như trên dòng 3



module.exports = Product;