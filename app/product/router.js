var express = require('express');
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("./controller")
const multer = require("multer");

const upload = multer({ dest: '/public/uploads/' })
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
/* GET home page. */
router.get("/", index)
router.get("/create", viewCreate)
router.post("/create", upload.single("thumbnail"), actionCreate)
router.get("/edit/:id", viewEdit)
router.put("/edit/:id", upload.single("thumbnail"), actionEdit)
router.delete("/delete/:id", actionDelete)

module.exports = router;