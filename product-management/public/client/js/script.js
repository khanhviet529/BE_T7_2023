// show Alert
let showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = document.querySelector("[close-alert]");

  if (time) {
    setTimeout(() => {
      showAlert.classList.add("alert-hidden");
    }, time);
  }

  if (closeAlert) {
    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
}
// End Show Alert