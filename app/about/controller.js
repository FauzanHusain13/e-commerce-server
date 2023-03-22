const About = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const about = await About.find()
            res.render("admin/about/view_about", {
                title: "Halaman about",
                about,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/about")
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const about = await About.findOne({ _id: id });
            res.render("admin/about/edit", {
                title: "Halaman ubah about",
                about
            })
        } catch (err) {
            res.redirect("/about")
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            await About.findOneAndUpdate({
                _id: id
            }, payload)
            
            req.flash("alertMessage", "Berhasil ubah about");
            req.flash("alertStatus", "success");
            res.redirect("/about")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/about")
        }
    },
}