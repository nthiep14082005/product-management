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
