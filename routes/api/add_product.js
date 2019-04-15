var keystone = require('keystone');
var Cart = keystone.list('Cart');
var serialize = require('serialize-javascript');


exports.post = module.exports = function (req, res) {

  var data = {
    customerId: req.body.user_id,
    productId: req.body.product_id
  }
  var addProductToCart = new Cart.model(data);
  // Save new user
  addProductToCart.save(function (err) {
		if (err) {
      // Redirect & show err messages
      console.log(err);
    }
	}).then(() => {
    res.send(data);
  });
}
