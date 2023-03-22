const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const HASH_ROUND = 10;

let userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email harus diisi"]
    },
    username: {
        type: String,
        require: [true, "Nama harus diisi"],
        maxLength: [225, "Panjang username harus antara 3 - 225 karakter"],
        minLength: [3, "Panjang username harus antara 3 - 225 karakter"]
    },
    password: {
        type: String,
        require: [true, "Kata sandi harus diisi"],
        minLength: [8, "Kata sandi minimal 8 karakter"]
    }
}, { timestamps : true })

userSchema.path("email").validate(async function(value) {
    try {
        const count = await this.model("User").countDocuments({ email: value })
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar!`)

userSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model("User", userSchema);