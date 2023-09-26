const ProductCategory = require("../../models/product-category.model");
const system = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.createTree(records);

  res.render("admin/pages/products-category/index", {
    title: "Danh mục sản phẩm",
    records: newRecords
  });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.createTree(records);

  res.render("admin/pages/products-category/create", {
    title: "Tạo mới danh mục",
    records: newRecords
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

