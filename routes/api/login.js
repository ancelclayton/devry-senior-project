var keystone = require('keystone');

exports = module.exports = function (req, res) {
  
  if (!req.body.login_email || !req.body.login_password) return res.json({ success: false });
  
  keystone.list('User').model.findOne({ email: req.body.login_email }).exec(function(err, customer) {
    
    // TODO Flash messages on locals
    if (err || !customer) {
       // TODO Flash messages on locals
      // Redirect
      res.redirect('/')   
    }
    
    keystone.session.signin({ email: customer.email, password: req.body.login_password, isCustomer: true }, req, res, 
      function(customer) {
        res.locals.name = customer.name;
        console.log(customer.name.first);
        res.redirect('/')
      }, 
      function(err) {
        // TODO Flash messages on locals
        // Redirect
        res.redirect('/')   
    });
    
  });
}
