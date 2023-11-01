// Edit product-category
const formEditProductCategory = document.querySelector("[form-edit-product-category]");
if (formEditProductCategory) {
  const uploadImageInput = formEditProductCategory.querySelector("[upload-image-input]");
  let uploadImagePreview = formEditProductCategory.querySelector("[upload-image-preview]");
  if (uploadImagePreview) {
    formEditProductCategory.addEventListener("submit", (e) => {
      e.preventDefault();
      const src = uploadImagePreview.getAttribute('src');
      let url = new URL(formEditProductCategory.action);
      url.searchParams.set("name", uploadImageInput.name);
      if (src != "") {
        url.searchParams.set("isData", "true");
      }
      formEditProductCategory.action = url;
      formEditProductCategory.submit();
    })
  }
}
// End Edit product-category

