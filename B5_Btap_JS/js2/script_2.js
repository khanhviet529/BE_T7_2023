// const convert = (s) => {
//     const time = s.slice(0, -2);
//     const status = s.slice(-2);
//     const arr = time.split(":");
//     let h = arr[0];
//     if (h == "12") h = "00";
//     if (status == "PM") h = parseInt(h) + 12;

//     const res = [h.toString(), arr[1], arr[2]].join(":");
//     return res;
// }

// const convert2 = (s) => {
//     let arr = s.split("");
//     arr = arr.map((item, index) => {
//         if (item == " ") return item;
//         if (index % 2 == 0) return item.toUpperCase();
//         else return item.toLowerCase();
//     });
//     return arr.join("");

// }

// var t = parseInt(prompt("Mời bạn nhập số bộ test 1"));
// while (t--) {
//     var s = prompt("Mời bạn nhập time cần chuyển đổi :");
//     console.log(convert(s));
// }

// t = parseInt(prompt("Mời bạn nhập số  bộ test xâu cần chuyển đổi : "));
// while (t--) {
//     var s = prompt("Mời bạn nhập xâu :");
//     console.log(convert2(s));
// }

const a = [2, 3, 4, 5];
let sum = a.reduce((total, item) => {
    return item;
}, 0);
console.log(sum);




