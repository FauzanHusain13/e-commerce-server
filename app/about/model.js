const mongoose = require("mongoose");

let aboutSchema = mongoose.Schema({
    paragraph1: {
        type: String,
        require: [true, "paragraph pertama harus diisi"]
    },
    paragraph2: {
        type: String,
    },
    paragraph3: {
        type: String,
    },
    paragraph4: {
        type: String
    }
}, { timestamps : true })

module.exports = mongoose.model("About", aboutSchema);