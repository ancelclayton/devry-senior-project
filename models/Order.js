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
	customerId:  { type: Types.Text, noedit: true },
	price: { type: Types.Text, noedit: true },
  deliveryDate: { type: Types.Date },
  paid: { type: Types.Boolean, default: true, noedit: true }
});

Order.defaultColumns = 'id, customerId, deliveryDate, price, paid';
Order.register();
