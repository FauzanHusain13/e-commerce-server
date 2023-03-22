var express = require('express');
var router = express.Router();
const { index, viewEdit, actionEdit } = require("./controller")

router.get("/", index)
router.get("/edit/:id", viewEdit)
router.put("/edit/:id", actionEdit)

module.exports = router;