var keystone = require('keystone');
var moment = require('moment');

var new_date = moment().add(10, 'days').calendar(); 

exports = module.exports = function (req, res) {
  var Cart = keystone.list('Cart');
  var Order = keystone.list('Order');
	var Product = keystone.list('Product');
	
  var view = new keystone.View(req, res);
  var locals = res.locals;	  

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'WSC | ' + req.params.slug;
	locals.section = 'Thank You';
  locals.deliveryDate = new_date;

  view.on('post', { action: 'complete_payment' }, function (next) {

    var data = req.body;
    locals.name = data.cc_name;
    locals.total = data.total;
    
    // Get all customer cart items
    Cart.model.find({
      customerId: req.user._id
    })
    .exec(function (err, cartItems) {  
      if(err) console.log(err);

      var cart = [];
      // loop through cart items
      cartItems.forEach(item => {        
        //Reduce product qty
        Product.model.findOne({ 
            _id: item.productId 
          })
          .exec(function (err, product) {  
            cart.push(product);
            product.quantity = product.quantity - 1;
            product.save();            
        });        
        // Delete cart Item
        item.remove();
      });
    });
    
    // create an order

    // send order recipt to locals & email
    next();
  });
  
	// Render the view
	view.render('thankyou');
};
