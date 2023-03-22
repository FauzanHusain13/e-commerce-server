const Product = require("../product/model")
const Category = require("../category/model")
const Cart = require("../cart/model");
const Application = require("../application/model")
const Logo = require("../logo/model")
const Jumbotron = require("../jumbotron/model")
const About = require("../about/model")

module.exports = {
    landingPage: async(req, res) => {
        try {
            const product = await Product.find()
                .sort({ date: -1 })
                .limit(6)
                .select("_id name price category thumbnail")
                .populate("category");

            res.status(200).json({
                data: product
            });
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    product: async(req, res) => {
        try {
            const category = req.query.category;

            if(category) {
                const product = await Product.find({ category })
                    .select("_id name price category thumbnail")
                    .populate("category");

                res.status(200).json({
                    data: product
                });
            } else {
                const product = await Product.find()
                    .select("_id name price category thumbnail")
                    .populate("category");

                res.status(200).json({
                    data: product
                });
            }
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    detailProduct: async(req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ _id: id })
                .populate("category");

            if(!product) {
                return res.status(404).json({
                    message: "product tidak ditemukan"
                });
            }
            
            res.status(200).json({ 
                data: product
            });
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    category: async(req, res) => {
        try {
            const category = await Category.find()

            res.status(200).json({
                data: category
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    sosmed: async(req, res) => {
        try {
            const sosmed = await Application.find()

            res.status(200).json({
                data: sosmed
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    logo: async(req, res) => {
        try {
            const logo = await Logo.find()

            res.status(200).json({
                data: logo
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    jumbotron: async(req, res) => {
        try {
            const jumbotron = await Jumbotron.find()

            res.status(200).json({
                data: jumbotron
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    about: async(req, res) => {
        try {
            const about = await About.find()

            res.status(200).json({
                data: about
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },

    // cart
    addCart: async(req, res) => {
        try {
            const { productId } = req.body;
            const product = await Product.findOne({ _id: productId }).populate("category");

            if (!product) {
                return res.status(404).json({
                    message: "Produk tidak ditemukan!"
                })
            }
            
            const existingCart = await Cart.findOne({ productId: productId, user: req.user._id });

            if (existingCart) {
                return res.status(400).json({
                    message: "Produk sudah ada di keranjang!"
                })
            }

            const payload = {
                productId: productId,
                user: req.user._id,
                thumbnail: product.thumbnail,
                name: product.name,
                price: product.price,
                category: product.category,
            }

            const cart = new Cart(payload)
            await cart.save();

            res.status(201).json({
                data: cart
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    cart: async(req, res) => {
        try {
            const cart = await Cart.find({ user: req.user._id }).populate("category");

            res.status(200).json({
                data: cart
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    },
    deleteCart: async(req, res) => {
        try {
            const { id } = req.body;

            await Cart.findOneAndDelete({ _id: id })
            
            res.status(201).json({
                message: "Berhasil hapus item"
            })
        } catch (err) {
            res.status(500).json({ message: err.message || "Internal server error" })
        }
    }
}