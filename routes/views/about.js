var keystone = require('keystone');

exports = module.exports = function (req, res) {
<<<<<<< HEAD

	var Products = keystone.list('Product');
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.title = 'About';
	locals.section = 'about';

=======
	var view = new keystone.View(req, res);
  var locals = res.locals;	
  locals.section = 'about';
  locals.label = 'About';
>>>>>>> 913dd083ffa0da762061396fb2ed239a091b1830

	// Render the view
	view.render('about');
};
