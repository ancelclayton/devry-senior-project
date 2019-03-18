var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var Product = keystone.list('Product');
	var view = new keystone.View(req, res);
	var locals = res.locals;	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'WSC | ' + req.params.slug;
	locals.section = 'New Section';
	console.log(req.params.slug);
	
	// Load featured products
	view.on('init', next => {
		Product.model.findOne({
				slug: req.params.slug,
				publish: true
			})
			.exec(function (err, results) {
				locals.product = results;		
				next(err);
			});
	});
	// Render the view
	view.render('product');
};
