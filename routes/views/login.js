var keystone = require('keystone');

exports = module.exports = function (req, res) {
  
  var Customer = keystone.list('Customer');
  var view = new keystone.View(req, res);
  var locals = res.locals;
  var formData = req.body || {};

  console.log(req);

  view.on('post', next => {
    Customer.model.findOne({
    })
    .exec(function (err, results) {
      locals.customer = results;		
      next();
    })
  });

  res.send('Auth');
};
