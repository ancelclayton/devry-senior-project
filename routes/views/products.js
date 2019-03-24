var keystone = require('keystone');

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