var keystone = require('keystone');
var Product = keystone.list('Product');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'WSC | ' + req.params;
	locals.section = 'New Section';
	
	// Load featured products
	view.on('init', function (next) {
		Product.model.find({
				slug: req.params.slug,
				publish: true
			})
			.then(function (results) {
				if(!results) {
					console.log("ERROR");
				}
				locals.data.product = results;	
				next(err);
			});
	});
	// Render the view
	view.render('product');
};
