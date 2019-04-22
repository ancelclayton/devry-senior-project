var keystone = require('keystone');

// Formats prices
function formatPrice(price) {
  return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

exports = module.exports = function (req, res) {
	var Product = keystone.list('Product');
	var view = new keystone.View(req, res);
	var locals = res.locals;	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'WSC | ' + req.params.slug;
	locals.section = req.params.slug;
	
	// Load featured products
	view.on('init', next => {
		Product.model.findOne({
				slug: req.params.slug,
				publish: true
      })
      .populate('categories')
			.exec(function (err, results) {        
        locals.product = results;		    
        locals.product.formatedPrice = formatPrice(locals.product.price);
            
				next(err);
			});
	});
	// Render the view
	view.render('product');
};
