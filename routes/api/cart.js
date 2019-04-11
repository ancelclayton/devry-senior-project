var keystone = require('keystone');
var Cart = keystone.list('Cart');
var serialize = require('serialize-javascript');


exports.post = module.exports = function (req, res) {
  const data = {
    customer: req.body.user,
    cartItems: req.body.product_id
  };

  console.log(req.body);
  

  // var addProductToCart = new Cart.model(data);
  // // Save new user
  // addProductToCart.save(function (err) {
	// 	if (err) {
  //     // Redirect & show err messages
  //     console.log(err);
  //   }
	// }).then(() => {
  //   res.send("JSON.stringify(data.id)");
  // });
  res.send('yep')
}
