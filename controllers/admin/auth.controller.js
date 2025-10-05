
const systemConfig = require("../../config/system");

const Account = require("../../model/accounts.model");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle_1: "Đăng nhập"
    })
}

module.exports.uploadLogin = async (req, res) => {
    // console.log(req.body);
    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;
    //  hoặc sử dụng destructuring để lấy data cũng được
    // const {email, password} = req.body;
    const user = await Account.findOne({
        email: emailLogin,
        deleted: false
    })
    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    } 

    console.log(passwordLogin, user.password);

    if( !bcrypt.compareSync(passwordLogin, user.password) ) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if( user.status != "active") {
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }


    res.cookie("token123", user.token); // -> trong này có token được lấy ngẫu nhiên thông qua hàm generate trong model account, hàm res.cookie này trong express có sẵn, tham số đầu để đặt tên, tham số 2 là truyền vào token của tài khoản
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}



module.exports.logout = async (req, res) => {
    res.clearCookie("token123"); // -> hàm có sẵn trong express dùng để xóa cookie
    
    res.redirect(`${systemConfig.prefixAdmin}/auths/login`); // -> sau khi clear cookie token123 thì redirect về trang login 

}