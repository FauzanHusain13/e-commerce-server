const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Nama produk harus diisi"]
    },
    price: {
        type: String,
        require: [true, "Harga produk harus diisi"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    features: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String,
        require: [true, "Gambar produk harus diisi"]
    },
    nameShop: {
        type: String,
        require: [true, "Tempat pembelian harus diisi"]
    },
    linkShop: {
        type: String,
        require: [true, "Link pembelian harus diisi"]
    },
    nameShop2: {
        type: String,
        require: [false, "Tempat pembelian ke 2 bisa diisi"]
    },
    linkShop2: {
        type: String,
        require: [false, "Link pembelian ke 2 bisa diisi"]
    }
}, { timestamps : true })

module.exports = mongoose.model("Product", productSchema);

productSchema.path("name").validate(async function(value) {
    try {
        const count = await this.model("Product").countDocuments({ name: value })
        return !count
    } catch (err) {
        throw err
    }
}, attr => `Nama produk sudah ada, Nama produk tidak boleh sama!`)