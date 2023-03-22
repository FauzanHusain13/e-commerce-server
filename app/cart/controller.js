const Cart = require("./model");

module.exports = {
    index: async(req, res) => {
        try{
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const cart = await Cart.find().populate("category").populate("user");
            res.render("admin/cart/view_cart", {
                cart,
                name: req.session.user.name,
                title: "Halaman Keranjang",
                alert
            })
        } catch(err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/cart");
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Cart.findOneAndDelete({ _id: id })

            req.flash("alertMessage", "Berhasil hapus item cart");
            req.flash("alertStatus", "success");
            res.redirect("/cart")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/cart")
        }
    }
}