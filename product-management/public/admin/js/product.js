// ChangeStatus
let buttonChanges = document.querySelectorAll("[button-change-status]");
if (buttonChanges.length > 0) {
    buttonChanges.forEach((item) => {
        item.addEventListener("click", () => {
            let check = confirm("Bạn có chắc là muốn đổi trạng thái hoạt động không");
            if (check) {
                let status = item.getAttribute("status");
                const id = item.getAttribute("id");
                if (status && id) {
                    status = (status == "active" ? "inactive" : "active");
                    let formChangeStatus = document.getElementById("form-change-status");
                    if (formChangeStatus) {
                        let action = formChangeStatus.getAttribute("data-path");
                        if (action) {
                            action = action + `${status}/${id}` + "?_method=PATCH";
                            formChangeStatus.action = action;
                            // console.log(action);
                            formChangeStatus.submit();
                        }
                    }
                }
                else {
                    alert("Data ChangeStatus không hợp lệ");
                }
            }
        })
    });
}
// End ChangeStatus

// CheckBox Multi
const tableCheckBox = document.querySelector("[checkbox-multi]");
if (tableCheckBox) {
    const inputCheckAll = document.querySelector("[checkbox-multi] input[name=checkAll]");
    const inputsCheck = document.querySelectorAll("[checkbox-multi] input[name=id]");
    if (inputCheckAll && inputsCheck) {
        inputCheckAll.addEventListener("click", () => {
            if (inputCheckAll.checked) {
                inputsCheck.forEach(item => {
                    item.checked = true;
                });
            }
            else {
                inputsCheck.forEach(item => {
                    item.checked = false;
                });
            }
        })

        inputsCheck.forEach((item) => {
            item.addEventListener("click", () => {
                var ok = 1;
                for (var i = 0; i < inputsCheck.length; i++) {
                    if (inputsCheck[i].checked == false) {
                        ok = -1;
                        break;
                    }
                }

                if (ok == 1) inputCheckAll.checked = true;
                else inputCheckAll.checked = false;
            })
        })
    }
}

// End CheckBox Multi

// Form checkMulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const type = e.target.elements.type.value;
        if (type == "disabled") {
            alert("Vui lòng chọn 1 chức năng !");
            return;
        }
        if (type == "delete-all") {
            const check = confirm("Are you sure you want to delete all items?");
            if (!check) {
                return;
            }
        }
        const inputsCheck = document.querySelectorAll("[checkbox-multi] input[name=id]:checked");
        const inputsId = formChangeMulti.querySelector("input[name=ids]");
        var ids = [];
        if (inputsCheck.length > 0 && inputsId) {
            inputsCheck.forEach(item => {
                if (type == "change-position") {
                    const inputPosition = item.closest("tr").querySelector("input[name=position]");
                    ids.push(`${item.value}-${inputPosition.value}`);
                }
                else {
                    ids.push(item.value);
                }
            });
            inputsId.value = ids.join(", ");
            // console.log(inputsId.value);
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }
    })
}
//End Form checkMulti

// Delete product
const buttonDelete = document.querySelectorAll("[checkbox-multi] [button-delete]");
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete");
    if (formDelete) {
        buttonDelete.forEach(item => {
            item.addEventListener("click", () => {
                const check = confirm("Are you sure you want to delete");
                if (check) {
                    const id = item.id;
                    let action = formDelete.getAttribute("data-path") + id + "?_method=PATCH";
                    formDelete.action = action;
                    formDelete.submit();
                }
            });
        });
    }
}
// End Delete product

//Show Alert
const showAlert = document.querySelector("[show-alert]");
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

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const containerPreview = uploadImage.querySelector(".container-preview");
    const uploadImagePreview = containerPreview.querySelector("[upload-image-preview]");
    const closePreview = containerPreview.querySelector(".close-preview");

    if (containerPreview) {
        const status = containerPreview.getAttribute("visible");
        if (status == "true") {
            containerPreview.classList.add("visible-preview");
        }
    }

    if (uploadImagePreview) {
        uploadImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadImagePreview.src = URL.createObjectURL(file);
                containerPreview.classList.add("visible-preview");
            }
        });
        if (closePreview) {
            closePreview.addEventListener("click", () => {
                containerPreview.classList.remove("visible-preview");
                uploadImagePreview.src = "";
                uploadImageInput.value = null;
            })
        }
    }

}
// End Upload image

// Edit product

const formEditProduct = document.querySelector("[form-edit-product]");
if (formEditProduct) {
    let uploadImagePreview = formEditProduct.querySelector("[upload-image-preview]");
    if (uploadImagePreview) {
        formEditProduct.addEventListener("submit", (e) => {
            e.preventDefault();
            const src = uploadImagePreview.getAttribute('src');
            if (src != "") {
                formEditProduct.action += "&isData=true";
            }
            console.log(formEditProduct.action);
            formEditProduct.submit();
        })
    }
}
// End Edit product

