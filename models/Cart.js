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
	customerId: { type: Types.Text, initial: true, noedit: true, required: true, index: true },
	productId: { type: Types.Text, initial: true, noedit: true, required: true, index: true }
});

/**
 * Registration
 */
Cart.defaultColumns = 'id, customerId, productId';
Cart.register();
