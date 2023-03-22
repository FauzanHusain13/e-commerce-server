const mongoose = require("mongoose")

let cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: String
    },
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
    thumbnail: {
        type: String,
        require: [true, "Gambar produk harus diisi"]
    },
}, { timestamps : true })

module.exports = mongoose.model("Cart", cartSchema);