var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
  var locals = res.locals;	
  locals.section = 'about';
  locals.label = 'About';

	// Render the view
	view.render('about');
};
