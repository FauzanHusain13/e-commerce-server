const mongoose = require("mongoose")
const { urlDb } = require("../config")

mongoose.set('strictQuery', false);
mongoose.connect(urlDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection;

module.exports = db