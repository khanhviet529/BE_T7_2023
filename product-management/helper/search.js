module.exports = (query) => {
    objectSearch = {
        title: "",
        keyword: ""
    }

    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        objectSearch.title = new RegExp(objectSearch.keyword, "i");
    }
    return objectSearch;
}