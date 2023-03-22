var express = require('express')
var router = express.Router()
const { index, viewCreate, actionCreate, actionDelete } = require("./controller")
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
/* GET home page. */
router.get("/", index)
router.get("/create", viewCreate)
router.post("/create", actionCreate)
router.delete("/delete/:id", actionDelete)

module.exports = router;