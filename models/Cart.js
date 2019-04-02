var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Cart Model
 * ==========
 */
var Cart = new keystone.List('Cart', {
  track: true,
  label: 'Shopping Cart',
	autokey: { from: 'customer', path: 'slug', unique: true },
});

Cart.add({
	customer: { type: Types.Email, initial: true, required: true, index: true },
	cartItems: { type: Types.Text }
});

/**
 * Registration
 */
Cart.defaultColumns = 'name, email, isAdmin';
Cart.register();
