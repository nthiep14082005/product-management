// -> dùng để bắt buộc chạy qua cái middleware này thì mới cho làm gì đó, như ở đây là
// ----> đây là để middleware router private

const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model");
const Role = require("../../model/role.model");

module.exports.requireAuth = async (req, res, next) => { // Bạn có thể đặt tên tham số tùy ý (ví dụ: required, responsed, tiếp), nhưng thứ tự phải đúng: (request, response, next).
    
    // console.log("Chay qua day ");

    // console.log(req.cookies); hoặc console.log(req.cookies.token123);
    // console.log(req.cookies.token123);

    if(!req.cookies.token123) {
        res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
    } else {
        // console.log(req.cookies.token123);
        const user = await Account.findOne({
            token: req.cookies.token123
        }).select("-password -avatar");
        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
        } else {     
            // console.log(user);
            const role = await Role.findOne({
                _id: user.role_id
            }).select("title permissions");
            // app.locals.userAdmin = user; // -> không sử dụng được từ app bởi vì trong này ko có định nghĩa app mà trong index.js đầu thì dùng được bởi đã định nghĩa nhưng 
            res.locals.userAdmin = user; // -> có thể sử dụng được res để tạo biến toàn cục sử dụng trực tiếp trong file pug bởi vì tham số thứ 2 là res -> tức là phản hồi, mà phản hồi thì sẽ trả về được 
            res.locals.roleAdmin = role;
            next();
        }
    }
}

