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
  paid: { type: Types.Boolean, default: true, noedit: true },
  isShipped: { type: Types.Boolean, default: false }
});

Order.defaultColumns = 'id, customerId, deliveryDate, price, paid, isShipped';
Order.register();
