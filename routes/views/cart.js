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
		products: [],
  };
  locals.totalPrice = 0;
  
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
        var price = 0;     
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
                product.price =(product.price * object[prop]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
                price += product.price * object[prop];
              } else {
                product.quantity = 1;
                price += product.price 
              }
            });
          }
        }
        
        locals.totalPrice = (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
        locals.data.products = results;		
				next(err);
      });
  });

	// Render the view
	view.render('cart');
};