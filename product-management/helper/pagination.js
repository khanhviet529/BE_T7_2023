// pagination 
const Product = require("../models/product.model");

module.exports = async (query, find, limitProducts, limitButtons) => {
    var objectPagination = {
        currentPage: 1,
        limitProducts: limitProducts,
        currentTotalPages: 1,
        skip: 0,
        quantity: 1,
        totalPages: 1,
        limitButtons: limitButtons
    }
    let currentPage = parseInt(query.page);
    if (currentPage != NaN && currentPage >= 1) {
        objectPagination.currentPage = currentPage;
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitProducts;
    }
    let currentTotalPages = parseInt(query.pageTotals);
    if (currentTotalPages != NaN && currentTotalPages >= 1) {
        objectPagination.currentTotalPages = currentTotalPages;
    }
    try {
        objectPagination.countProduct = await Product.count(find);
        objectPagination.quantity = Math.ceil(objectPagination.countProduct / objectPagination.limitProducts);
        objectPagination.totalPages = Math.ceil(objectPagination.quantity / objectPagination.limitButtons);
    } catch (error) {
        console.error("Lỗi pagination");
    }


    return objectPagination;
}