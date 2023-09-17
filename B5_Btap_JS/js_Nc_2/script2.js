// import { fetchApi } from './helper/Fetch.js';

// console.log(10);
// const getRandomInt = () => {
//     const res = Math.floor((Math.random() * 10)) + 1;
//     return new Promise((resolve, reject) => {
//         if (res) resolve(res);
//         else {
//             reject("Invalid");
//         }
//     });
// }

// var promise = getRandomInt()
// promise
//     .then((number) => {
//         console.log("res=", number);
//     })

//     .catch((err) => {
//         console.log("err=", err);
//     });


// Bài 5

// (async () => {
//     const data = await fetchApi("https://restcountries.com/v2/all");
//     console.log(data);
// })();



//End Bài 5

const fetchApi = async (api) => {
    const response = await fetch(api);
    const result = await response.json();
    return result;
};

fetchApi("https://restcountries.com/v2/all").then((data) => {
    let htmls = data.map((item) => {
        return `
          <div class="inner-item">
            <div class="inner-box">
              <img class="inner-image" src="${item.flag}" alt="${item.capital} - ${item.name}" />
              <div class="inner-title">
                ${item.capital} - ${item.name}
              </div>
            </div>
          </div>
        `;
    });

    htmls = htmls.join("");

    const divCountry = document.querySelector("#country");
    divCountry.innerHTML = htmls;
});