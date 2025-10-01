const Account = require("../../model/accounts.model");
const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");
const flash = require("express-flash");

const md5 = require("md5");
const bcrypt = require("bcrypt");
const system = require("../../config/system");


// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token"); // -> sử dụng .select("giátrị1 giátrị2") để từ trong backend chỉ trả về giao diện đúng các giá trị được chọn   

    for (const item of records) {
        const role = await Role.findOne({
            deleted: false,
            _id: item.role_id
        });
        item.roles = role;
        // console.log(item.roles[0]); -> khi mà sử dụng find
    }
    // console.log(records);
    res.render("admin/pages/accounts/index", {
        pageTitle_1: "Danh sách tài khoản",
        record: records,
    });
};

// [GET] /admin/accounts/create -> renderCreate
module.exports.renderCreate = async (req, res) => {
    let find = {
        deleted: false
    }

    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create", {
        pageTitle_1: "Tạo mới tài khoản",
        role: roles
    });
};

// [POST] /admin/accounts/create -> createPost 
module.exports.createPost = async (req, res) => {
   try {
        // --------------> trước khi lưu vào database thì phải check xem email đã tồn tại trong database hay chưa, nếu chưa thì cho phép tạo, rồi thì bắt nhập email khác
        const emailAndPhoneExist = await Account.findOne({ // // const products = await Product.find(find); // trong mongo thì hàm find sẽ trả về 1 mảng sản phẩm, còn fineOne là trả về 1 sản phẩm tức là chỉ 1 object sản phẩm đó
                                                            //     ---> muốn sử dụng find mà chỉ lấy 1 bản ghi thì như sau -> console.log(products[0]);
            deleted: false,
            $or: [  //   -> Nếu muốn kiểm tra chỉ cần 1 trong 2 (email hoặc phone) đã tồn tại, hãy dùng $or như trên.
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        })
        if(emailAndPhoneExist) {
            req.flash("error","Email hoặc Số điện thoại đã tồn tại!");
            res.redirect("back");
        } else {
            // req.body.password = md5(req.body.password); // -----------> sử dụng md5 để mã hóa mật khẩu
            req.body.password = bcrypt.hashSync(req.body.password, 10); // -----------> sử dụng bcrypt để mã hóa mật khẩu
            const records = new Account(req.body);
            await records.save();
            req.flash("success", "Tạo tài khoản thành công");
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        }
   } catch (error) {
        res.redirect("back");
   }
};


// [GET] /admin/accounts/edit/:id -> render trang sửa 1 tài khoản
module.exports.renderEditAccount = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const data = await Account.findOne(find);

        const roles = await Role.find({
            deleted: false
        });

        res.render("admin/pages/accounts/edit", {
            pageTitle_1: "Chỉnh sửa tài khoản",
            datas: data,
            role: roles
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
};

// [PATCH] /admin/accounts/edit/:id -> update sửa tài khoản
module.exports.editAccount = async (req, res) => {
    try {
        if(req.body.password) { //-> chec password bởi vì bt để trong page là rỗng nếu cập nhập thì nó sẽ gửi password vào database là rỗng nên phải check nếu cập nhập thì update còn để rỗng thì giữ nguyên password trong database
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        } else {
            delete req.body.password; // -> tức là khi này nếu không gì ở password thì sử dụng delete req.body.password tức là xóa key tên là password trong req.body để khi này trong body không còn thì sẽ không bị update lên database
        }
        console.log(req.body)
        const idC = req.params.id;
        await Account.updateOne({ _id: idC }, req.body);
        req.flash("success", "Cập nhập tài khoản thành công!");
        res.redirect("back");
    } catch (error) {   
        req.flash("error", "Cập nhập tài khoản không thành công!");
        res.redirect("back");
    }
}