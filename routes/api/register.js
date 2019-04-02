var keystone = require('keystone');
var Customer = keystone.list('Customer');

exports = module.exports = function (req, res) {

  res.send('Auth');
};
