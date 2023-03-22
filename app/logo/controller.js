const Logo = require("./model")
const path = require("path");
const fs = require("fs")
const config = require("../../config")

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };
            const logo = await Logo.find()
            res.render("admin/logo/view_logo", {
                title: "Halaman logo",
                logo,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/logo")
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const logo = await Logo.findOne({ _id: id });
            res.render("admin/logo/edit", {
                title: "Halaman ubah logo",
                logo,
            })
        } catch (error) {
            console.log(err)
            res.redirect("/logo")
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
                let filename = req.file.filename + "." + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async() => {
                    try {
                        const logo = await Logo.findOne({ _id: id });

                        let currentImage = `${config.rootPath}/public/uploads/${logo.logo}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }

                        await Logo.findOneAndUpdate({
                            _id: id
                        },{
                            logo: filename
                        })

                        await logo.save();
            
                        req.flash("alertMessage", "Berhasil ubah logo");
                        req.flash("alertStatus", "success");
                        res.redirect("/logo");
                    } catch (err) {
                        req.flash("alertMessage", `${err.message}`)
                        req.flash("alertStatus", "danger");
                        res.redirect("/logo");
                    }
                })
            } else {
                req.flash("alertMessage", `${err.message}`)
                req.flash("alertStatus", "danger");
                res.redirect("/logo");
            }
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/logo");
        }
    },
}