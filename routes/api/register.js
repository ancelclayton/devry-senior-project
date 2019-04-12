var keystone = require('keystone');
var serialize = require('serialize-javascript');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

  var { email, password, firstName, lastName } = req.body;

  var data = { 
    email: email, 
    password: password, 
    name: { first: firstName, last: lastName } 
  }

  // TODO: Fix this
  var serializedData = serialize(data);
  
  var newUser = new User.model(data);
  newUser.isCustomer = true;
  newUser.isAdmin = false;

  // Save new user
  newUser.save(function (err) {
		if (err) {
      // Redirect & show err messages
      console.log(err);
    }
	}).then(() => {
    // Login Session
    keystone.session.signin({ email: email, password: password, isCustomer: true }, req, res, 
      function(customer) {
        res.locals.name = customer.name;
        // Redirect
        res.redirect('/')
      }, 
      function(err) {
        // TODO Flash messages on locals 
        // Redirect
        res.redirect('/')  
      }
    );
  });
};
