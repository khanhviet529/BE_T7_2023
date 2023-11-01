// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
	let url = new URL(window.location.href);

	buttonsStatus.forEach(button => {
		button.addEventListener("click", () => {
			const status = button.getAttribute("button-status");

			if (status) {
				url.searchParams.set("status", status);
			} else {
				url.searchParams.delete("status");
			}

			window.location.href = url.href;
		});
	});
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
	let url = new URL(window.location.href);

	formSearch.addEventListener("submit", (e) => {
		e.preventDefault();
		const keyword = e.target.elements.keyword.value;

		if (keyword) {
			url.searchParams.set("keyword", keyword);
			url.searchParams.set("page", 1);
			url.searchParams.set("pageTotals", 1);
		} else {
			url.searchParams.delete("keyword");
		}

		window.location.href = url.href;
	});
}
// End Form Search

// Pagination
const listItems = document.querySelectorAll(".pagination [buttonPagination]");
const buttonNext = document.querySelector(".pagination [button-next]");
const buttonPrev = document.querySelector(".pagination [button-prev]");
if (listItems.length > 0) {
	listItems.forEach((item) => {
		item.addEventListener("click", () => {
			let url = new URL(window.location.href);
			const page = parseInt(item.getAttribute("buttonPagination"));
			url.searchParams.set("page", page);
			window.location.href = url;
		})
	});
}
if (buttonNext) {
	buttonNext.addEventListener("click", () => {
		try {
			let pageTotals = parseInt(buttonNext.getAttribute("button-next"));
			let currentPage = parseInt(buttonNext.getAttribute("currentPage"));
			let limitButtons = parseInt(buttonNext.getAttribute("limitButtons"));
			let maxPages = parseInt(buttonNext.getAttribute("maxPages"));
			let maxPageCurrent = Math.min(limitButtons * pageTotals, maxPages);
			const pageTotalsMax = buttonNext.getAttribute("total");
			if (currentPage <= maxPageCurrent) {

				if (currentPage < maxPageCurrent) {
					let url = new URL(window.location.href);
					url.searchParams.set("page", currentPage + 1);
					window.location.href = url;
				}
				else {
					if (pageTotals < pageTotalsMax) {
						let url = new URL(window.location.href);
						url.searchParams.set("pageTotals", pageTotals + 1);
						url.searchParams.set("page", maxPageCurrent + 1);
						window.location.href = url;
					}
				}
			}
		} catch (error) {
			console.error("Lỗi ButtonNext");
		}
	})
}

if (buttonPrev) {

	buttonPrev.addEventListener("click", () => {
		try {
			let pageTotals = parseInt(buttonPrev.getAttribute("button-prev"));
			let currentPage = parseInt(buttonNext.getAttribute("currentPage"));
			let limitButtons = parseInt(buttonNext.getAttribute("limitButtons"));
			let start = (pageTotals - 1) * limitButtons + 1;
			if (currentPage >= start) {

				if (currentPage > start) {
					let url = new URL(window.location.href);
					url.searchParams.set("page", currentPage - 1);
					window.location.href = url;
				}
				else {
					if (pageTotals > 1) {
						let url = new URL(window.location.href);
						url.searchParams.set("pageTotals", pageTotals - 1);
						url.searchParams.set("page", start - 1);
						window.location.href = url;
					}
				}
			}
		} catch (error) {
			console.error("Lỗi ButtonPrev");
		}
	})
}
// End Pagination

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

// Sort
const sort = document.querySelector("[sort]");
if (sort) {
	let url = new URL(window.location.href);

	const sortSelect = sort.querySelector("[sort-select]");
	const sortClear = sort.querySelector("[sort-clear]");

	// Select
	sortSelect.addEventListener("change", (e) => {
		let value = e.target.value.split("-");
		url.searchParams.set("sortKey", value[0]);
		url.searchParams.set("sortValue", value[1]);
		window.location.href = url.href;
	});
	// End Select

	// Clear
	sortClear.addEventListener("click", (e) => {
		url.searchParams.delete("sortKey");
		url.searchParams.delete("sortValue");
		window.location.href = url.href;
	})
	// End clear

	// Thêm selected

	const sortKey = url.searchParams.get("sortKey");
	const sortValue = url.searchParams.get("sortValue");
	let Default;
	if (sortKey && sortValue) {
		Default = sortSelect.querySelector(`option[value='${sortKey}-${sortValue}']`);
	}
	else {
		Default = sortSelect.querySelector("option[disabled]");
	}
	Default.selected = true;
	// End Thêm selected
}
// End Sort

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
	const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
	const containerPreview = uploadImage.querySelector(".container-preview");
	let uploadImagePreview;
	let closePreview;

	if (containerPreview) {
		const status = containerPreview.getAttribute("visible");
		if (status == "true") {
			containerPreview.classList.add("visible-preview");
		}
		uploadImagePreview = containerPreview.querySelector("[upload-image-preview]");
		closePreview = containerPreview.querySelector(".close-preview");
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