// find_pos = (data, id) => {
//     id = parseInt(id);
//     let l = 1, r = data.length - 1;
//     while (l <= r) {
//         let mid = parseInt((l + r) / 2);
//         let id_Mid = data[mid]["id"];
//         if (id_Mid === id) return data[mid];
//         else if (data[mid]["id"] < id)
//             l = mid + 1;
//         else r = mid - 1;
//     }
//     return -1;
// }

// const ordersJSON = `
//   [
//     {
//       "id": 1,
//       "items": [
//         {
//           "productId": 1,
//           "quantity": 2
//         },
//         {
//           "productId": 2,
//           "quantity": 1
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "items": [
//         {
//           "productId": 3,
//           "quantity": 3
//         }
//       ]
//     }
//   ]
// `;

// const productsJSON = `
//   [
//     {
//       "id": 1,
//       "name": "iPhone 12",
//       "price": 1200
//     },
//     {
//       "id": 2,
//       "name": "Samsung Galaxy S21",
//       "price": 1000
//     },
//     {
//       "id": 3,
//       "name": "Google Pixel 5",
//       "price": 900
//     }
//   ]
// `;

// var products = JSON.parse(productsJSON);
// products.unshift({ digit: 0 });
// console.log(products[1]);
// var orders = JSON.parse(ordersJSON);
// orders.unshift({ digit: 0 });
// var T = parseInt(prompt("Mời bạn nhập số lượng đơn hàng "));
// while (T--) {
//     var id = prompt("Mời bạn nhập id");
//     var res = find_pos(orders, id);
//     if (res === -1) {
//         console.error("Failed to find");
//     }
//     else {
//         let list = res["items"];
//         var sum = 0;
//         for (let x of list) {
//             let id_product = x["productId"], quantity = x["quantity"];
//             let product = find_pos(products, id_product);
//             sum += quantity * product["price"];
//         }
//         console.log(sum);
//     }
// }




