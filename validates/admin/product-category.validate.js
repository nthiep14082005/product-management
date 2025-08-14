module.exports.createPost = (req, res, next) => {
   // bai 25 - 28tech - 48ph -> validate dữ liệu , validate title
    if(!req.body.title) {
        req.flash('Error', `Vui lòng nhập tiêu đề`);
        res.redirect("back");
        return; // khi return để nó dừng hết các đoạn code dưới để tránh trường hợp value rác vào database
    }
    if(req.body.title.length < 3) {
        req.flash('Error', `Vui lòng nhập tiêu đề lớn hơn 3 ký tự`);
        res.redirect("back");
        return; // khi return để nó dừng hết các đoạn code dưới để tránh trường hợp value rác vào database
    }

    // ở đây khi middleware sang đây và validate thành công thì mới cho đi tiếp sang thằng controlller.createPost nên nó sẽ có 1 biến là next -> tức là đi tiếp
    next(); // nếu không có next thì nó sẽ không đi tiếp sang controller.createPost
}