const mongoose = require("mongoose");

let applicationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    link: {
        type: String,
    },
}, { timestamps : true })

module.exports = mongoose.model("Application", applicationSchema);