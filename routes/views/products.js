var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var Products = keystone.list('Product');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'Products';
	locals.section = 'products';

	// Filtering
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		products: [],
	};

	// Load featured products
	view.on('init', function (next) {
		Products.model.find({
				publish: true,
      })
      .populate('categories')
			.exec(function (err, results) {
				locals.data.products = results;		
				next(err);
			});
	});

	// Render the view
	view.render('products');
};
