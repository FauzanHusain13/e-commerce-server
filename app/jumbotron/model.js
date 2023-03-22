const mongoose = require("mongoose");

let jumbotronSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Title harus diisi"],
        maxLength: [40, "Panjang username harus antara 7 - 40 karakter"],
        minLength: [7, "Panjang username harus antara 7 - 40 karakter"]
    },
    subTitle: {
        type: String,
        require: [true, "Sub Title harus diisi"],
        maxLength: [40, "Panjang username harus antara 5 - 40 karakter"],
        minLength: [5, "Panjang username harus antara 5 - 40 karakter"]
    }
}, { timestamps : true })

module.exports = mongoose.model("Jumbotron", jumbotronSchema);