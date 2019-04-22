var keystone = require('keystone');

function formatPrice(price) {
  return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function getTax(price) {
  return 0.09 * price;
}

function getTotal(price) {
  return price + getTax(price);
}

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
        locals.products = results;
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
        var price = 0;     
        // Matching up products to cartItems & adding props
        results.forEach(product => {                 
          locals.products.forEach(orderProduct => {                           
            if(orderProduct.productId == product._id){
              orderProduct.title = product.name
              orderProduct.price = formatPrice(product.price)
              orderProduct.qty = 1;
              orderProduct.description = product.description
              orderProduct.image = product.image.secure_url;
              // totalPrice
              price += product.price;
            }
          });
        });
        locals.tax = formatPrice(getTax(price));
        locals.price = formatPrice(price); 
        locals.totalPrice = formatPrice(getTotal(price));
				next(err);
      });
  });

	// Render the view
	view.render('cart');
};