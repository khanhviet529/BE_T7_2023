const input = document.querySelector('#input');
const show = document.querySelector('#show');
const screen = document.querySelector('#screen');

show.addEventListener('click', () => {
    data = input.value;
    screen.innerHTML = data;
});