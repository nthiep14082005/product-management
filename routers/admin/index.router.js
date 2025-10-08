const dashboardRoutes = require("./dashboard.router");
const productsRoutes = require("./products.router");
const productsCategoryRoutes = require("./products-category.router");
const rolesRoutes = require("./roles.router");
const accountsRoutes = require("./account.router");
const authsRouters = require("./auths.router");

const systemConfig = require("../../config/system");


// middleware router private
const authMiddleware = require("../../middlewares/admin/auth.middleware");


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes); // nên để /admin đăngf trước phòng trường hợp bên client có tên trùng với bên admin
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productsRoutes);
    // app.use(PATH_ADMIN + "/products/products-category", productsCategory); // hoặc 
    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productsCategoryRoutes);  

    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, rolesRoutes);
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountsRoutes);
    app.use(PATH_ADMIN + "/auths", authsRouters);
}


// file này chỉ đơn giản là tạo router /admin/products
// Đúng vậy, trong Express, app.use() có chức năng "mount" middleware hoặc router lên một đường dẫn cụ thể.
