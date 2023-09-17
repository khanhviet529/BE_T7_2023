// [Get] /admin/dasboard

module.exports.dashboard = (req, res) => {
    res.render("admin/pages/dashboard/index", {
        title: "Trang DashBoard"
    })
};
