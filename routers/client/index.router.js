const productRouter = require("./products.router");
const homeRouter = require("./home.router")


// cách để nhúng trong express là
module.exports = (app) => { 
    app.use('/', homeRouter);
    
    app.use('/products', productRouter);
 }

//  Nó nhận đối tượng app (là một instance của Express).
// Sau đó, nó sử dụng app.use() để đăng ký các router:
//              app.use('/', homeRouter);: Khi người dùng truy cập đường dẫn /, homeRouter sẽ xử lý yêu cầu.
//              app.use('/products', productRouter);: Khi người dùng truy cập /products, productRouter sẽ xử lý yêu cầu.




// bai19 30s

