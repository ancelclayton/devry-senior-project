var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.filters = {
    product: req.body.product
	};
	locals.data = {
    products:[]
	};
	view.on('init', function(next){
		var q = keystone.list('Product').model.findOne({
		   key:  locals.filters.product
			})
			
			
			q.exec(function(err, result){
				locals.data.product = result;
				next(err);
			});
		
		});
	
	

	// On POST requests, add the Enquiry item to the database
	
	view.on('post', { action: 'contact' }, function (next) {
		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

			 

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, product, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
				//console.log("locals.data.product.name");
			} else {
				
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
