var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Order Model
 * ==================
 */

var Order = new keystone.List('Order', {
	track: true,
	autokey: { from: 'name', path: 'slug', unique: true },
});

Order.add({
	customer: { type: Types.Relationship, ref: 'Customer', initial: true, many: false },
	product: { type: Types.Relationship, ref: 'Product', initial: true, many: false },
	quantity: { type: Number },
	paid: { type: Boolean, default: false },
});

Order.defaultColumns = 'type, customer, product, quantity, paid';
Order.register();
