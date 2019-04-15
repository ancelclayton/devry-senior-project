var keystone = require('keystone');

exports.get = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var Cart = keystone.list('Cart');
	var Products = keystone.list('Product');
  var productsArray = [];
  var locals = res.locals;
	
  locals.section = 'cart';
  locals.title = 'WSC | ' + req.params.slug;
  locals.label = 'Shopping Cart';

  locals.data = {
    totalPrice: 0,
		products: [],
  };
  
  // Load products from user id
	view.on('init', next => {
		Cart.model.find({
				customerId: req.user._id
      })
			.exec(function (err, results) {
        results.forEach(product => {
          productsArray.push(product.productId); 
        });          
        next(err);
      });
  });

  view.on('init', function (next) {
      Products.model.find({
        _id: {
          $in: productsArray
        }
      })
      .exec(function (err, results) {    
        if(err) { console.log(err); }  
        var object = {};        
        // Count qty to objects
        productsArray.forEach(function (item) {
          if(!object[item])
              object[item] = 0;
            object[item] += 1;
        })
        for (var prop in object) {
          if(object[prop] >= 2) {            
            results.forEach(product => {              
              if(product._id == prop){
                product.quantity = object[prop];
              } else {
                product.quantity = 1;
              }
            });
          }
        }

        locals.data.products = results;		
				next(err);
      });
  });

	// Render the view
	view.render('cart');
};