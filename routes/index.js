/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
//var importPublic = keystone.importer("./public");


// Common Middleware
//keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
/*keystone.set('404', function(req, res, next) {
	res.notfound();
  });
  
  // Handle other errors
  keystone.set('500', function(err, req, res, next) {
	var title, message;
	if (err instanceof Error) {
	  message = err.message;
	  err = err.stack;
	}
	res.err(err, title, message);
  });*/

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  apis: importRoutes('./api'), 
};




// Setup Route Bindings
exports = module.exports = function (app) {
	//app.locals.cart = "wtf"
	// Views
	app.get('/', routes.views.index);
	app.all('/contact', routes.views.contact);
	app.get('/products', routes.views.products);
	app.get('/products/:product', routes.views.product);
	app.all('/addToCart/:product', routes.views.addToCart);
	app.all('/about', routes.views.about);
	app.post('/post/:id', routes.views.post);
//	app.all('/public/uploads/files/fileAPITest', routes.api.fileupload)
	//app.use(keystone.static(public.))


	/// API's
  //File Upload Router
  //app.post('/api/signin', routes.api.signin);
  //app.post('/api/signout', signout);
  //app.get('./api/cart', routes.api.cart);
  /*app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
  app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
  app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
  app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
  app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);
  *///
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
 // app.get('/protected', middleware.requireUser, routes.views.protected);

	// NOTE: To protect a route so that only admins can see it, use the requireAuth middleware:
  app.get('/cart', middleware.requireAuth, routes.views.cart);
};
