var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var Product = keystone.list('Product');
	var view = new keystone.View(req, res);
  var locals = res.locals;	  
  locals.totalPrice = req.body.total_price;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'WSC | ' + req.params.slug;
	locals.section = 'Checkout';
  
  view.on('post', { action: 'checkout' }, function (next) {
  });
  
	// Render the view
	view.render('checkout');
};
