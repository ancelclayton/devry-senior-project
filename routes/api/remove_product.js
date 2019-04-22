var keystone = require('keystone');
var Cart = keystone.list('Cart');

exports.post = module.exports = function (req, res) {
  var data = {
    _id: req.body.product_id,
    customerId: req.body.user_id
  }
  
  Cart.model.remove(data).limit(1).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
  }); 
  
  res.redirect('/cart');
}
