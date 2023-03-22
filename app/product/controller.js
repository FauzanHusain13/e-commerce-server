const Product = require("./model")
const Category = require("../category/model")
const User = require("../user/model")
const path = require("path");
const fs = require("fs")
const config = require("../../config")

const nodemailer = require("nodemailer");

// create transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email,
        pass: config.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = { message: alertMessage, status: alertStatus };

            const product = await Product.find().populate("category")
            res.render("admin/product/view_product", {
                title: "Halaman product",
                product,
                alert
            })
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/product")
        }
    },
    viewCreate: async(req, res) => {
        try {
            const category = await Category.find()

            res.render("admin/product/create", {
                title: "Halaman Tambah produk",
                category
            })
        } catch (err) {
            res.redirect("/product")
        }
    },
    actionCreate: async(req, res) => {
        try {
            const { name, price, category, features, description, nameShop, linkShop, nameShop2, linkShop2 } = req.body;

            const users = await User.find();
            const emails = [];

            for (let i = 0; i < users.length; i++) {
                emails.push(users[i].email);
            }

            const mailOptions = {
                from: config.email,
                to: emails,
                subject: "New Product",
                html: (
                    `<div style="background-color: #f2f2f2; padding: 20px;">
                        <h2 style="text-align: center; color: #333;">New Product</h2>
                        <h4 style="text-align: center; color: #666; font-size: 18px; margin-top: 20px;">Produk baru dari brand kami "${name}".</h4>
                        <p style="text-align: center; color: #666; font-size: 18px; margin-top: 20px;>${description}</p>
                        <p style="text-align: center; margin: 40px auto 0;">
                            <a href="http://localhos:3000/collections" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none;">Lihat produk</a>
                        </p>
                    </div>`
                )
            };

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
                        const product = new Product({
                            name, 
                            price, 
                            category, 
                            features, 
                            description,
                            nameShop,
                            linkShop,
                            nameShop2, 
                            linkShop2,
                            thumbnail: filename
                        })

                        await product.save();

                        // send email
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error) {
                                req.flash("alertMessage", `${error.message}`)
                                req.flash("alertStatus", "danger");
                            } else {
                                req.flash("alertMessage", "Berhasil kirim email");
                                req.flash("alertStatus", "success");
                            }
                        });
                        
                        req.flash("alertMessage", "Berhasil tambah product");
                        req.flash("alertStatus", "success");
                        res.redirect("/product");
                    } catch (err) {
                        req.flash("alertMessage", `${err.message}`)
                        req.flash("alertStatus", "danger");
                        res.redirect("/product");
                    }
                })
            } else {
                req.flash("alertMessage", "Gambar harus diisi")
                req.flash("alertStatus", "danger");
                res.redirect("/product");
            }
        } catch(err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/product");
        }
    },
    viewEdit: async(req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findOne({ _id: id });
            const category = await Category.find()
            res.render("admin/product/edit", {
                title: "Halaman ubah product",
                product,
                category
            })
        } catch (error) {
            console.log(err)
            res.redirect("/product")
        }
    },
    actionEdit: async(req, res) => {
        try {
            const { id } = req.params;
            const { name, price, category, features, description, nameShop, linkShop, nameShop2, linkShop2 } = req.body;

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
                        const product = await Product.findOne({ _id: id });

                        let currentImage = `${config.rootPath}/public/uploads/${product.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }

                        await Product.findOneAndUpdate({
                            _id: id
                        },{
                            name, 
                            price, 
                            category, 
                            features, 
                            description, 
                            nameShop, 
                            linkShop, 
                            nameShop2, 
                            linkShop2,
                            thumbnail: filename
                        })

                        await product.save();
            
                        req.flash("alertMessage", "Berhasil tambah product");
                        req.flash("alertStatus", "success");
                        res.redirect("/product");
                    } catch (err) {
                        req.flash("alertMessage", `${err.message}`)
                        req.flash("alertStatus", "danger");
                        res.redirect("/product");
                    }
                })
            } else {
                req.flash("alertMessage", "Gambar harus diisi")
                req.flash("alertStatus", "danger");
                res.redirect("/product");
            }
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/product");
        }
    },
    actionDelete: async(req, res) => {
        try {
            const { id } = req.params;

            const product = await Product.findOneAndRemove({
                _id: id
            });

            let currentImage = `${config.rootPath}/public/uploads/${product.thumbnail}`;
            if(fs.existsSync(currentImage)){
                fs.unlinkSync(currentImage)
            }

            req.flash("alertMessage", "Berhasil hapus product");
            req.flash("alertStatus", "success");
            res.redirect("/product");
        } catch (err) {
            req.flash("alertMessage", `${err.message}`)
            req.flash("alertStatus", "danger");
            res.redirect("/product");
        }
    }
}