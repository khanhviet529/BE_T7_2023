const express = require("express");
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/products-test-t7-2023-01');

const Product = mongoose.model('Product', {
  title: String,
  price: Number,
  thumbnail: String
});



const app = express();
const port = 3000;

app.use(express.static("../vi-du-01/public"));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("page/home.pug", {
    title: "Home",
    desc: "Đây là miêu tả cho page Home"
  });
});

app.get("/contact", (req, res) => {
  res.render("page/contact.pug", {
    title: "Contact",
    desc: "Đây là miêu tả cho page Contact"
  })
})

app.get("/product", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render("page/product", {
    title: "Danh sách sản phẩm",
    products: products
  })
})

app.listen(port, () => {
  console.log(`Đã chạy thành công vào công ${port}`)
});