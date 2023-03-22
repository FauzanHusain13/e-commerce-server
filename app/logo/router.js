var express = require('express');
var router = express.Router();
const { index, viewEdit, actionEdit } = require("./controller")
const multer = require("multer");

const upload = multer({ dest: '/public/uploads/' })

router.get("/", index)
router.get("/edit/:id", viewEdit)
router.put("/edit/:id", upload.single("logo"), actionEdit)

module.exports = router;