const Product = require("../../models/product.model");

const productsHelper = require("../../helper/products");

// [Get] /
module.exports.index = async (req, res) => {
    // Lấy ra sp nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6);

    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
    // Hiển thị danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);

    const newProductsNew = productsHelper.priceNewProducts(productsNew);
    // Hết Hiển thị danh sách sản phẩm mới nhất

    res.render("client/pages/home/index", {
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew,
        title: "Trang chủ"
    });
};