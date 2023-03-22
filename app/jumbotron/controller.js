const Jumbotron = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const jumbotron = await Jumbotron.find()
            res.render("admin/jumbotron/view_jumbotron", {
                title: "Halaman jumbotron",
                jumbotron,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/jumbotron")
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const jumbotron = await Jumbotron.findOne({ _id: id });
            res.render("admin/jumbotron/edit", {
                title: "Halaman Ubah categori",
                jumbotron
            })
        } catch (error) {
            res.redirect("/jumbotron")
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { title, subTitle } = req.body;

            await Jumbotron.findOneAndUpdate({
                _id: id
            }, { title, subTitle })

            req.flash("alertMessage", "Berhasil ubah jumbotron");
            req.flash("alertStatus", "success");
            res.redirect("/jumbotron")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/jumbotron")
        }
    },
}