const dashboardRoutes = require("./dashboard.router");
const prodcutsRoutes = require("./products.router");

const systemConfig = require("../../config/system");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard",dashboardRoutes); // nên để /admin đăngf trước phòng trường hợp bên client có tên trùng với bên admin
    app.use(PATH_ADMIN + "/products",prodcutsRoutes);
}