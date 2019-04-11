var keystone = require('keystone');

exports.get = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
  var locals = res.locals;	
  locals.section = 'cart';
  locals.label = 'Cart';

	// Render the view
	view.render('cart');
};