var keystone = require('keystone');
var Types = keystone.Field.Types;
var routes = keystone.import('routes');
var productPost = keystone.list('Product');

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

console.log(locals.data.product);
//var qtyWherehouse = req.params.quantity;
//var qtyCart = req.body.id;
//var newQtyWherehouse = qtyWherehouse - qtyCart;
//console.log(productPost);

view.on('init', function(next){
var productPost = keystone.list('Product').model.findOne({
    key: locals.filters.product,
    
    })
    productPost.exec(function(err, result){
        locals.data.product = result;
        next(err);
    
    });
    console.log(productPost);
});


	// Render the view
	view.render('addToCart');
};