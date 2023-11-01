const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");

const filterStatusHelper = require("../../helper/filterStatus");
const objectSearchHelper = require("../../helper/search");
const pagination = require("../../helper/pagination");
const limitPages = require("../../config/limitPages");
const system = require("../../config/system");
const createTreeHelper = require("../../helper/createTree");
const changeMulti = require("../../helper/changeMulti");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  // Find
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
    var products = await Product.find(find).
      limit(objectPagination.limitProducts).
      skip(objectPagination.skip).
      sort(sort);

    for (const product of products) {
      // Lấy ra thông tin người tạo
      const user = await Account.findOne({
        _id: product.createdBy.account_id
      });

      if (user) {
        product.accountFullName = user.fullName;
      }

      // Lấy ra thông tin người cập nhật gần nhất
      const updatedBy = product.updatedBy.slice(-1)[0];
      if (updatedBy) {
        const userUpdated = await Account.findOne({
          _id: updatedBy.account_id
        });

        updatedBy.accountFullName = userUpdated.fullName;
      }
    }
  } catch (error) {
    console.error("Lỗi truy vấn dữ liệu trang /admin/products");
  }

  res.render("admin/pages/products/index", {
    title: "Danh sách sản phẩm",
    products: (products || []),
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    quantityPage: objectPagination.quantity,
    currentPage: objectPagination.currentPage,
    limitButtons: limitPages.limitButtons,
    totalPages: objectPagination.totalPages,
    currentTotalPages: objectPagination.currentTotalPages,
    currentIndex: objectPagination.skip + 1
  });
}

// [Path] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }

    await Product.updateOne({ _id: id }, {
      status: status,
      $push: { updatedBy: updatedBy }
    });
    req.flash("success", "Cập nhật trạng thái thành công");
  } catch (error) {
    req.flash("error", "Cập nhật trạng thái thất bại !")
  }
  res.redirect("back");
}

// [Path] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  await changeMulti.changeMultiForm(req, res, Product);
  res.redirect("back");
}

// [Path] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.updateOne({ _id: id }, {
      "deleted": true,
      // deletedAt: new Date(),
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      }
    });
    req.flash("success", `Xóa thành công 1 sản phẩm `);
  } catch (error) {
    req.flash("error", "Xóa sản phẩm thất bại");
  }
  res.redirect("back");
}

// [Get] /admin/products/create
module.exports.create = async (req, res) => {
  try {
    let find = {
      deleted: false
    };

    const records = await ProductCategory.find(find);
    var newRecords = createTreeHelper.createTree(records);
  } catch (error) {
    req.flash('error', "Lỗi tạo sản phẩm !");
  }
  res.render("admin/pages/products/create", {
    title: "Trang tạo sản phẩm",
    records: (newRecords || [])
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
      const countProducts = await Product.count();
      req.body.position = countProducts + 1;
    }
    else {
      req.body.position = parseInt(req.body.position);
    }

    req.body.createdBy = {
      account_id: res.locals.user.id
    };

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
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    let findCategory = {
      deleted: false
    };

    const records = await ProductCategory.find(findCategory);
    const newRecords = createTreeHelper.createTree(records);
    if (product) {
      res.render("admin/pages/products/edit", {
        title: "Trang chỉnh sửa sản phẩm",
        product: product,
        records: newRecords
      });
    }
    else {
      res.flash("error", "Sản phẩm không tồn tại");
      res.redirect(`${system.prefixAdmin}/products`);
    }
  } catch (error) {
    req.flash("error", "Đến trang chỉnh sửa thất bại");
    res.redirect(`${system.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.stock = parseInt(req.body.stock);
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
      ...req.body,
      $push: { updatedBy: updatedBy }
    });
    req.flash('success', "Bạn đã cập nhật sản phẩm thành công !");
  }
  catch (error) {
    req.flash('error', "Cập nhật thất bại");
  }
  res.redirect(`back`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const product = await Product.findOne(find);
    if (product) {
      res.render("admin/pages/products/detail", {
        title: "Trang chi tiết sản phẩm",
        product: product
      });
    }
    else {
      res.flash("error", "Sản phẩm không tồn tại");
      res.redirect(`${system.prefixAdmin}/products`);
    }
  } catch (error) {
    req.flash("error", "Đến trang chi tiết sản phẩm thất bại");
    res.redirect(`${system.prefixAdmin}/products`);
  }
}

