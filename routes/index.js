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


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  apis: importRoutes('./api'), 
};

// Setup Route Bindings
exports = module.exports = function (app) {
  
	// Views
  app.get('/', routes.views.index);
  app.get('/about', routes.views.about);
	app.get('/products', routes.views.products);
	app.get('/product/:slug', routes.views.product);
  app.get('/privacy-policy', routes.views.privacy_policy);

  // Contact Form
  app.all('/contact', routes.views.contact);

  // API'S
  app.all('/login', routes.apis.login);
  app.all('/logout', routes.apis.logout);
  app.post('/register', routes.apis.register);
  app.post('/add_product', middleware.requireAuth, routes.apis.add_product);
  app.post('/remove_product', middleware.requireAuth, routes.apis.remove_product);

  // PROTECTED ROUTES
	// NOTE: To protect a route so that only admins can see it, use the requireAuth middleware:
  app.get('/cart', middleware.requireAuth, routes.views.cart);
  app.get('/orders', middleware.requireAuth, routes.views.orders);
  app.post('/checkout', middleware.requireAuth, routes.views.checkout );
  app.post('/complete_payment', middleware.requireAuth, routes.views.complete_payment );
};
