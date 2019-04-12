var keystone = require('keystone');
var productPost = keystone.list('Product');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.filters = {
    product: req.params.product,
		post: req.body.id,
    };
    
    console.log(locals.filters.post);
    view.on('post', { action: 'submit' }, function(next) {
        post:  locals.filters.post 
})
    view.render('post');
}