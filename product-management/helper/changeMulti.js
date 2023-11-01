module.exports.changeMultiForm = async (req, res, Product) => {
  try {
    const ids = req.body.ids.split(", ");
    const type = req.body.type;
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }

    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, {
          status: "active",
          $push: { updatedBy: updatedBy }
        });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm `);
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, {
          status: "inactive",
          $push: { updatedBy: updatedBy }
        });
        req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm `);
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: ids } }, {
          deleted: true,
          // deletedAt: new Date(),
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          }
        });
        req.flash("success", `Xóa thành công ${ids.length} sản phẩm `);
        break;
      case "change-position":
        ids.forEach(async (item) => {
          item = item.split("-");
          let [id, position] = item;
          position = parseInt(position);
          // console.log(id, position);
          await Product.updateOne({ _id: id },
            {
              position: position,
              $push: { updatedBy: updatedBy }
            });
        });
        req.flash("success", `Cập nhật thay đổi vị trí thành công ${ids.length} sản phẩm `);
        break;
      default:
        break;
    }
  } catch (error) {
    req.flash("error", "Cập nhật trạng thái thất bại");
  }
}