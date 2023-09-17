
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