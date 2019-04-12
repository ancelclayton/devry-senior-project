var keystone = require('keystone');

<<<<<<< HEAD
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // set locals
    locals.section = 'products';
    

    // load products
    view.query('products', keystone.list('Product').model.find());

    
    // render view
    view.render('products');
}
=======
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
>>>>>>> 913dd083ffa0da762061396fb2ed239a091b1830
