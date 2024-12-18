// đổi chỗ
var a = "dat", b = "an";
[a, b] = [b, a];
console.log(a, b);
// End đổi chỗ

// Thuận nghịch
a = "abac"
a = a.split("").reverse().join("");
console.log(typeof a);
//End Thuận nghịch

// Trả về giao diện
const data = {
    img: "https://cdn.daca.vn/media/blog/lap-trinh/js%20tips%20-%20m%E1%BB%99t%20s%E1%BB%91%20c%C3%A1ch%20vi%E1%BA%BFt%20js%20ng%E1%BA%AFn%20g%E1%BB%8Dn%20h%C6%A1n.png",
    title: "JS TIPS - Một số cách viết JS ngắn gọn hơn",
    desc: "Hôm nay Daca.vn gửi tới các bạn một số những tips để giúp bạn code JS một cách hiệu quả...",
    url: "https://daca.vn/js-tips-mot-so-cach-viet-js-ngan-gon-hon"
};

const article = document.querySelector('.article');
console.log(article);
const content = `
    <a href ="${data.url}" target="_blank">
        <div class="article__image">
            <img src ="${data.img}">
        </div>
        <div class="article__content">
            <div class="article__content__title" >${data.title}</div>
            <div class="article__content__desc" >${data.desc}</div>
        </div>
    </a>
`;

article.innerHTML = content;

// Trả về giao diện 
