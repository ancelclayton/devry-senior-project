var keystone = require('keystone');
var moment = require('moment');

var new_date = moment().add(10, 'days'); 

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
  locals.deliveryDate = new_date.calendar();

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
        }).then(() => {
          // Delete cart Item
          item.remove();
        });        
      });
    });
    
    // send order recipt to locals & email
    var orderData = {
      customerId: data.user_id,
      price: locals.total,
      deliveryDate: new_date,
      paid: true
    }
    var newOrder = new Order.model(orderData);
    newOrder.save();

    next();
  });


  
	// Render the view
	view.render('thankyou');
};
