const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle_1: "Nhóm quyền",
    record: records,
  });
};

module.exports.renderCreate = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle_1: "Tạo mới nhóm quyền",
  });
};

module.exports.postCreate = async (req, res) => {
  // console.log(req.body);

  try {
    const records = new Role(req.body);
    await records.save();
    // res.redirect("back");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

module.exports.renderRoles = async (req, res) => {
  try {
    const idC = req.params.id;

    let find = {
      _id: idC,
      deleted: false,
    };
    const data = await Role.findOne(find);

    res.render("admin/pages/roles/edit", {
      pageTitle_1: "Sửa nhóm quyền",
      datas: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

module.exports.editRoles = async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id)
    try {
        const idC = req.params.id;


        await Role.updateOne({ _id: idC }, req.body);
        req.flash("success", "Cập nhập nhóm quyền thành công");
        res.redirect("back");
    } catch (error) {
        req.flash("Error", "Cập nhập nhóm quyền thành công");
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};


module.exports.renderPermissions = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle_1: "Phân quyền",
    record: records
  });
}


module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissionsConver = JSON.parse(req.body.permissions);
    // console.log(permissionsConver);
  
    for(const item of permissionsConver) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions })
    }
  
    req.flash("success", "Cập nhập phân quyền thành công!");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhập phân quyền không thành công!");
    res.redirect("back");
  }
}