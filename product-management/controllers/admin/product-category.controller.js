const ProductCategory = require("../../models/product-category.model");

const filterStatusHelper = require("../../helper/filterStatus");
const objectSearchHelper = require("../../helper/search");
const pagination = require("../../helper/pagination");
const limitPages = require("../../config/limitPages");
const system = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");
const changeMulti = require("../../helper/changeMulti");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  // Find
  var find = {
    deleted: false
  };

  filterStatus = filterStatusHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

  let objectSearch = objectSearchHelper(req.query);
  if (objectSearch.title) {
    find.title = objectSearch.title;
  }
  // End find

  // Pagination
  try {
    var objectPagination = await pagination(req.query, find, limitPages.limitProducts, limitPages.limitButtons);
  } catch (error) {
    req.flash("error", "Lỗi pagination");
  }
  // End Pagination

  // Sort
  var sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  else {
    sort.position = "desc";
  }
  // End Sort

  try {
    const records = await ProductCategory.find(find).sort(sort);;
    var newRecords = createTreeHelper.createTree(records);
  } catch (error) {
    req.flash("error", "Lỗi load giao diện");
  }

  res.render("admin/pages/products-category/index", {
    title: "Danh mục sản phẩm",
    records: (newRecords || []),
    filterStatus: filterStatus,
    keyword: objectSearch.keyword
  });
}

// [Path] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    await ProductCategory.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái thành công");
  } catch (error) {
    req.flash("error", "Cập nhật trạng thái thất bại !")
  }
  res.redirect("back");
}

// [Path] /admin/products-category/change-multi
module.exports.changeMulti = async (req, res) => {
  await changeMulti.changeMultiForm(req, res, ProductCategory);
  res.redirect("back");
}

// [Path] /admin/products-category/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await ProductCategory.updateOne({ _id: id }, {
      "deleted": true,
      "deletedAt": new Date()
    });
    req.flash("success", `Xóa thành công 1 sản phẩm `);
  } catch (error) {
    req.flash("error", "Xóa sản phẩm thất bại");
  }
  res.redirect("back");
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };

  try {
    const records = await ProductCategory.find(find);
    var newRecords = createTreeHelper.createTree(records);
  } catch (error) {
    req.flash('error', "Lỗi giao diện");
  }

  res.render("admin/pages/products-category/create", {
    title: "Tạo mới danh mục",
    records: (newRecords || [])
  });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position == "") {
      const countProducts = await ProductCategory.count();
      req.body.position = countProducts + 1;
    }
    else {
      req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    req.flash("success", "Thêm mới sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Thêm mới sản phẩm thất bại");
  }
  res.redirect(`${system.prefixAdmin}/products-category`);

}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    let find = {
      deleted: false
    };

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.createTree(records);
    find["_id"] = req.params.id;

    const recordOne = await ProductCategory.findOne(find);
    if (recordOne) {
      res.render("admin/pages/products-category/edit", {
        title: "Trang chỉnh sửa danh mục sản phẩm",
        records: newRecords,
        recordOne: recordOne
      });
    }
    else {
      res.flash("error", "Sản phẩm không tồn tại");
      res.redirect(`${system.prefixAdmin}/products-category`);
    }
  } catch (error) {
    req.flash("error", "Đến trang chỉnh sửa danh mục thất bại");
    res.redirect(`${system.prefixAdmin}/products-category`);
  }
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    await ProductCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', "Bạn đã cập nhật danh mục sản phẩm thành công !");
  }
  catch (error) {
    req.flash('error', "Cập nhật thất bại");
  }
  res.redirect(`back`);
}


