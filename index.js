// cài đặt express flash để hiển thị thông báo sau khi xóa, cạpa nhập, thay dổi sản phẩm
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const express = require('express');
// TinyMCE 
const path = require('path');

const moment = require('moment');
// cài đặt slug nhúng bên model


// nhúng file method-override
const methodOverride = require('method-override');
// bodyParser này dùng để convert data từ form gửi lên và được lưu trữ vào req.body
const bodyParser = require('body-parser');

// cách nhúng file router 
const route = require("./routers/client/index.router");
// router ben admin
const routeAdmin = require("./routers/admin/index.router");





// dotenv là lưu trữ cấu hình của file .env
require("dotenv").config()
const app = express()
const port = process.env.PORTenv;
// do trên docx của method-override là ghi sau const app = express() 
app.use(methodOverride('_method')); // -> 56:00 28tech bai 22
// -> vào phần views/admin/products/index.pug để xem 
// bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// Đúng, trong các ứng dụng Express xử lý form (đặc biệt là form PATCH, DELETE), method-override và bodyParser thường được dùng chung với nhau.




// sử dụng flash 
app.use(cookieParser('iiisdnakkksh')); // -> muón sử dụng phải cài thêm thư viện cookie-parser
app.use(session({ cookie: { maxAge: 60000 }})); // -> muón sử dụng phải cài thêm thư viện cookie-session
app.use(flash());


// Start TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE


const systemConfig = require("./config/system");
// biến toàn cục
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;




// // nhúng mongoose
// const mongoose = require('mongoose');
// // dùng câu lệnh connect để connect data trong mongoosemongoose
// mongoose.connect(process.env.MONGO_URL)
// cách nhúng database
const database = require("./config/database");
database.connect(); // hàm connect có sẵn được định nghĩa trong config 



// var morgan = require('morgan')
// app.use(morgan('combined'))
// app.use(express.static('public'))



app.set('views',`${__dirname}/views`)
app.set('view engine', 'pug')




// khi up lên online thì express nó sẽ ko hiểu public là file gì nên ta phải dùng __dirname -> tức là cấu trúc thư mục của file đang làm việc -> lên gg search
app.use(express.static(`${__dirname}/public`));
// app.use(express.static("public"));




// router
route(app);
// router admin
routeAdmin(app);



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/products-test1');
// const Product = mongoose.model('Product', 
//   { title: String,
//     price: Number,
//     thumbnail: String
//    });





app.listen(port,() => console.log(`http://localhost:${port}`));

// module.exports = (req, res) => {
//   app(req, res);
// };
