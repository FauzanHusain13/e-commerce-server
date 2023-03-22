const mongoose = require("mongoose");

let logoSchema = mongoose.Schema({
    logo: {
        type: String,
        require: [true, "Logo harus diisi"],
    }
}, { timestamps : true })

module.exports = mongoose.model("Logo", logoSchema);