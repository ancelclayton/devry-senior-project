var keystone = require('keystone');
<<<<<<< HEAD
var Types = keystone.Field.Types;
var routes = keystone.import('routes');

exports = module.exports = function (req, res) {
var view = new keystone.View(req, res);
var locals = res.locals;


// set locals
locals.section = 'product';
locals.filters = {
    product: req.params.product
}
locals.data = {
    products:[]
}

view.on('init', function(next){
var q = keystone.list('Product').model.findOne({
   key:  locals.filters.product,
  // quantity: locals.filters.product,
    })
    
    
    q.exec(function(err, result){
        locals.data.product = result;
        next(err);
    });

});

console.log(locals.section);


    view.render('product');
};
=======

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
				next(err);
			});
	});
	// Render the view
	view.render('product');
};
>>>>>>> 913dd083ffa0da762061396fb2ed239a091b1830
