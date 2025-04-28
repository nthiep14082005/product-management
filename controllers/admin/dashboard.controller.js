// [GET] /admin/dashboard

module.exports.dashboard = (req, res) => {
    // mặc định hàm render sẽ truy cập vào /views vì ta dùng app.set('views','./views'), app.set('view engine', 'pug')
    res.render("admin/pages/dashboard/index.pug", { 
        pageTitle: "Trang tong quan title"
    });
};