var keystone = require('keystone');

exports.get = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var Order = keystone.list('Order');
  var locals = res.locals;
	
  locals.section = 'orders';
  locals.title = 'WSC | ' + req.params.slug;
  locals.label = 'Orders';
  
  // Load products from user id
	view.on('init', next => {
		Order.model.find({
				customerId: req.user._id
      })
			.exec(function (err, results) {
        locals.orders = results;
        next(err);
      });
  });

	// Render the view
	view.render('orders');
};