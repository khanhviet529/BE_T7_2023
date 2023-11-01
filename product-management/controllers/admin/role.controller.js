const Role = require("../../models/role.model");
const system = require("../../config/system");

// [Get] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/index", {
    title: "Trang nhóm quyền",
    records: records
  })
};

// [GET] /admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create", {
    title: "Trang thêm mới nhóm quyền"
  })

}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${system.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id
  }

  const data = await Role.findOne(find);

  res.render("admin/pages/roles/edit", {
    title: "Trang chỉnh sửa nhóm quyền",
    data: data
  })
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  await Role.updateOne({ _id: req.params.id }, req.body);
  res.redirect("back");
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/permissions", {
    title: "Phân quyền",
    records: records
  });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {

  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }

  req.flash("success", "Cập nhật phân quyền thành công !");
  res.redirect("back");
}


