// var fruits = ['apple', 'banana', 'orange'];

// const data = JSON.stringify(fruits);
// localStorage.setItem('fruits', data);
// var response = localStorage.getItem('fruits');
// response = JSON.parse(response);
// console.log(response);

// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// // Hiển thị danh sách công việc
// function displayTasks() {
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = "";
//     for (let i = 0; i < tasks.length; i++) {
//         const li = document.createElement("li");
//         li.textContent = tasks[i];

//         li.setAttribute("data-index", i); // Thêm thuộc tính data-index để xác định index của công việc
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Xóa";
//         deleteButton.addEventListener("click", function () {
//             const index = parseInt(this.parentElement.getAttribute("data-index"));
//             deleteTask(index);
//         });
//         li.appendChild(deleteButton);

//         taskList.appendChild(li);
//     }
// }

// // Thêm công việc mới
// function addTask() {
//     const taskInput = document.getElementById("taskInput");
//     const task = taskInput.value;
//     if (task !== "") {
//         tasks.push(task);
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//         taskInput.value = "";
//         displayTasks();
//     }
// }

// // Xóa công việc
// function deleteTask(index) {
//     tasks.splice(index, 1);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     displayTasks();
// }

// // Hiển thị danh sách công việc ban đầu
// displayTasks();

// // Lắng nghe sự kiện click vào nút Thêm
// const button = document.querySelector("#button");
// button.addEventListener("click", addTask);
var data = JSON.parse(localStorage.getItem("data")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("input"); // Thay "#yourInputId" bằng ID thực sự của phần tử input
    input.focus();
    input.addEventListener("focus", () => {
        input.classList.add("active");
    });
    input.addEventListener("blur", () => {
        input.classList.remove("active");
    });
});

function addItem() {
    const input = document.querySelector("#input");
    if (input.value !== "") {
        const text = input.value;
        data.push(text);
        draw();
        localStorage.setItem("data", JSON.stringify(data));
        input.value = "";
    }
}

function deleteItem(index) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    draw();
}

const tam = () => {
    const index = parseInt(this.parentElement.getAttribute("index"));
    deleteItem(index);
}

function draw() {
    const list = document.querySelector("#list");
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.textContent = data[i];
        li.setAttribute("index", i);
        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete";
        buttonDelete.addEventListener("click", () => {
            const index = parseInt(buttonDelete.parentElement.getAttribute("index"));
            deleteItem(index);
        });
        // buttonDelete.addEventListener("click", tam);
        li.appendChild(buttonDelete);
        list.appendChild(li);
    }
}

draw();
const button = document.querySelector("#button");
button.addEventListener("click", addItem);

