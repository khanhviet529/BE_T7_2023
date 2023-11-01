// Edit product
const formEditProduct = document.querySelector("[form-edit-product]");
if (formEditProduct) {
    const uploadImageInput = formEditProduct.querySelector("[upload-image-input]");
    let uploadImagePreview = formEditProduct.querySelector("[upload-image-preview]");
    if (uploadImagePreview) {
        formEditProduct.addEventListener("submit", (e) => {
            e.preventDefault();
            const src = uploadImagePreview.getAttribute('src');
            let url = new URL(formEditProduct.action);
            url.searchParams.set("name", uploadImageInput.name);
            if (src != "") {
                url.searchParams.set("isData", "true");
            }
            formEditProduct.action = url;
            formEditProduct.submit();
        })
    }
}
// End Edit product


