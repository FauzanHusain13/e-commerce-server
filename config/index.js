const dotenv = require("dotenv");
const path = require("path")

dotenv.config()

module.exports = {
    serviceName: process.env.SERVICE_NAME,
    urlDb: process.env.MONGO_URL,
    jwtKey: process.env.SECRET,
    email: process.env.AUTH_EMAIL,
    password: process.env.AUTH_PASSWORD,
    rootPath: process.env.ROOT_PATH,
}
