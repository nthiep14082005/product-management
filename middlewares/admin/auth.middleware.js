// -> dùng để bắt buộc chạy qua cái middleware này thì mới cho làm gì đó, như ở đây là
// ----> đây là để middleware router private

const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model");

module.exports.requireAuth = async (req, res, next) => {
    
    // console.log("Chay qua day ");

    // console.log(req.cookies); hoặc console.log(req.cookies.token123);
    console.log(req.cookies.token123);

    if(!req.cookies.token123) {
        res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
    } else {
        console.log(req.cookies.token123);
        const user = await Account.findOne({
            token: req.cookies.token123
        });
        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auths/login`);
        } else {     
            console.log(user);
            next();
        }
    }
}

