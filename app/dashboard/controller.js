const Product = require("../product/model")
const Cart = require("../cart/model")
const User = require("../user/model")
const Category = require("../category/model")

module.exports = {
    index: async(req, res) => {
        try {
            const product = await Product.countDocuments()
            const cart = await Cart.countDocuments()
            const user = await User.countDocuments()
            const category = await Category.countDocuments()
            
            res.render("admin/dashboard/view_dashboard", {
                title: "Halaman Dashboard",
                count: {
                    product,
                    cart,
                    user,
                    category
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}