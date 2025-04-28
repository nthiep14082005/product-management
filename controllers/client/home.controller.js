// [GET] /



module.exports.index = function (req, res) { // ở đây .index tức là tên biến 
    res.render("client/pages/home/index", {                                                                                                 ////////////////// bài 18 - 1:44:27 -> cái method render sẽ mặc định vào folder views
        pageTitle: "Trang chu"
    });
}