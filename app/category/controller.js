const Category = require("./model")

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const category = await Category.find()
            res.render("admin/category/view_category", {
                title: "Halaman category",
                category,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/category")
        }
    },
    viewCreate: async(req, res) => {
        try {
            res.render("admin/category/create", {
                title: "Halaman Tambah categori"
            })
        } catch (err) {
            res.redirect("/category")
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name } = req.body;

            let category = await Category({ name })
            await category.save()

            req.flash("alertMessage", "Berhasil tambah kategori");
            req.flash("alertStatus", "success");
            res.redirect("/category")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/category")
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findOne({ _id: id });
            res.render("admin/category/edit", {
                title: "Halaman Ubah categori",
                category
            })
        } catch (error) {
            res.redirect("/category")
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.findOneAndUpdate({
                _id: id
            }, { name })
            
            req.flash("alertMessage", "Berhasil ubah kategori");
            req.flash("alertStatus", "success");
            res.redirect("/category")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/category")
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            await Category.findOneAndDelete({ _id: id })

            req.flash("alertMessage", "Berhasil hapus kategori");
            req.flash("alertStatus", "success");
            res.redirect("/category")
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/category")
        }
    }
}