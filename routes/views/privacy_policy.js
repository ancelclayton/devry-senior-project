var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
  var locals = res.locals;	
  locals.section = 'privacy-policy';
  locals.label = 'Privacy Policy';

	// Render the view
	view.render('privacy_policy');
};
