const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
	try {
		const products = await Product.find({
			status: "active",
			deleted: false
		}).sort({ position: "desc" });

		const newProducts = products.map(item => {
			item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
			return item;
		});

		res.render("client/pages/products/index", {
			pageTitle: "Danh sách sản phẩm",
			products: newProducts
		});
	} catch (error) {
		req.flash("error", "Chuyển hướng thất bại");
		res.redirect("back");
	}
}

// [GET] /products/:slug

module.exports.detail = async (req, res) => {
	try {
		const product = await Product.findOne({
			status: "active",
			deleted: false,
			slug: req.params.slug
		});

		if (product) {
			req.flash("success", "Chi tiết sản phẩm")
			res.render("client/pages/products/detail", {
				title: "Chi tiết sản phẩm",
				product: product
			});
		}
		else {
			req.flash("error", "Sản phẩm không tồn tại");
			res.redirect("/products");
		}
	} catch (error) {
		req.flash("error", "Chuyển hướng thất bại");
		res.redirect("/products");
	}
}