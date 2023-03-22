var express = require('express');
var router = express.Router();
const { signup, signin } = require("./controller");

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;