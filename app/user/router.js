var express = require('express');
var router = express.Router();
const { landingPage, product, detailProduct, category, addCart, cart, deleteCart, sosmed, logo, jumbotron, about } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth")

router.get('/landingPage', landingPage);
router.get('/product', product);
router.get('/:id/detail', detailProduct);
router.get('/category', category);
router.get('/sosmed', sosmed);
router.get('/logo', logo);
router.get('/jumbotron', jumbotron);
router.get('/about', about);

// cart
router.post('/cart/add', isLoginPlayer, addCart);
router.get('/cart',  isLoginPlayer, cart);
router.delete('/cart/delete/:id',  isLoginPlayer, deleteCart)

module.exports = router;