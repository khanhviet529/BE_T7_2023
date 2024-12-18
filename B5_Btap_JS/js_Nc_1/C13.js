const productsJSON = `
  [
    {
      "id": 1,
      "name": "iPhone 12",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "quantity": 5
    },
    {
      "id": 3,
      "name": "Google Pixel 5",
      "quantity": 8
    }
  ]
`;

var data = JSON.parse(productsJSON);
const sum = (data) => {
    return data.reduce((total, item) => {
        return total + item["quantity"];
    }, 0);
}
console.log(sum(data));
