const mongoose = require("mongoose")
const { urlDb } = require("../config")

mongoose.connect(urlDb, {
    useUnifiedTopology: true
})

const db = mongoose.connection;

module.exports = db