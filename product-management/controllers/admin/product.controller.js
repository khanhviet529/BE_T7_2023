const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const objectSearchHelper = require("../../helper/search");
const pagination = require("../../helper/pagination");
const limitPages = require("../../config/limitPages");
const system = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  var find = {
    deleted: false
  };

  filterStatus = filterStatusHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = objectSearchHelper(req.query);
  if (objectSearch.title) {
    find.title = objectSearch.title;
  }
  // Pagination
  var objectPagination = await pagination(req.query, find, limitPages.limitProducts, limitPages.limitButtons);
  // End Pagination
  try {
    var products = await Product.find(find).
      limit(objectPagination.limitProducts).
      skip(objectPagination.skip).
      sort({ position: "desc" });
  } catch (error) {
    console.error("Lỗi truy vấn dữ liệu trang /admin/products");
  }

  res.render("admin/pages/products/index", {
    title: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    quantityPage: objectPagination.quantity,
    currentPage: objectPagination.currentPage,
    limitButtons: limitPages.limitButtons,
    totalPages: objectPagination.totalPages,
    currentTotalPages: objectPagination.currentTotalPages
  });
}

// [Path] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái thành công");
  } catch (error) {
    req.flash("error", "Cập nhật trạng thái thất bại !")
  }
  res.redirect("back");
}

// [Path] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
  try {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm `);
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm `);
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: ids } }, {
          deleted: true,
          deletedAt: new Date()
        });
        req.flash("success", `Xóa thành công ${ids.length} sản phẩm `);
        break;
      case "change-position":
        ids.forEach(async (item) => {
          item = item.split("-");
          let [id, position] = item;
          position = parseInt(position);
          // console.log(id, position);
          await Product.updateOne({ _id: id }, { position: position });
        });
        req.flash("success", `Cập nhật thay đổi vị trí thành công ${ids.length} sản phẩm `);
        break;
      default:
        break;
    }
  } catch (error) {
    res.flash("error", "Cập nhật trạng thái thất bại");
  }
  res.redirect("back");
}

// [Path] /admin/products/delete/:id

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.updateOne({ _id: id }, {
      "deleted": true,
      "deletedAt": new Date()
    });
    req.flash("success", `Xóa thành công 1 sản phẩm `);
  } catch (error) {
    req.flash("error", "Xóa sản phẩm thất bại");
  }
  res.redirect("back");
}

// [Get] /admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create");
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
      const countProducts = await Product.count() + 1;
      req.body.position = countProducts + 1;
    }
    else {
      req.body.position = parseInt(countProducts + 1);
    }
    if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Tạo mới sản phẩm thành công");
  } catch (error) {
    req.flash("error", "Tạo mới sản phẩm thất bại");
  }
  res.redirect(`${system.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      _id: req.params.id
    }
    const product = await Product.find(find);
    res.render("admin/pages/products/edit", {
      product: product[0]
    });
  } catch (error) {
    req.flash("error", "Đến trang chỉnh sửa thất bại");
  }
}

// [POST] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.stock = parseInt(req.body.stock);
    if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;
    else if (req.query.isData != "true") req.body.thumbnail = null;
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', "Bạn đã cập nhật sản phẩm thành công !");
  }
  catch (error) {
    req.flash('error', "Cập nhật thất bại");
  }
  res.redirect(`back`);
}

