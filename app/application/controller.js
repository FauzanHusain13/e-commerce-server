const Application = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const application = await Application.find()
            res.render("admin/application/view_application", {
                title: "Halaman application",
                application,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/application")
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/application/create", {
                title: "Halaman tambah sosial media"
            })
        } catch (err) {
            console.log(err)
            res.redirect("category")
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name, link } = req.body;

            let application = await Application({ name, link })
            await application.save()

            req.flash("alertMessage", "Berhasil tambah sosial media");
            req.flash("alertStatus", "success");
            res.redirect("/application")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/application")
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Application.findOneAndDelete({ _id: id })
            
            req.flash("alertMessage", "Berhasil hapus sosial media");
            req.flash("alertStatus", "success");
            res.redirect("/application")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/application")
        }
    }
}