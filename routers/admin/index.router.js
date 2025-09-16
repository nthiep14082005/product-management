const dashboardRoutes = require("./dashboard.router");
const productsRoutes = require("./products.router");
const productsCategoryRoutes = require("./products-category.router");
const rolesRoutes = require("./roles.router");

const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard",dashboardRoutes); // nên để /admin đăngf trước phòng trường hợp bên client có tên trùng với bên admin
    app.use(PATH_ADMIN + "/products",productsRoutes);
    // app.use(PATH_ADMIN + "/products/products-category", productsCategory); // hoặc 
    app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes);  

    app.use(PATH_ADMIN + "/roles", rolesRoutes);

}


// file này chỉ đơn giản là tạo router /admin/products
// Đúng vậy, trong Express, app.use() có chức năng "mount" middleware hoặc router lên một đường dẫn cụ thể.
