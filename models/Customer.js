var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Customer Model
 * ==========
 */
var Customer = new keystone.List('Customer');

Customer.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Address', {
  addressLine1: { type: Types.Text },
  addressLine2: { type: Types.Text },
  city: { type: Types.Text },
  state: { type: Types.Text },
});

/**
 * Registration
 */
Customer.defaultColumns = 'name, email';
Customer.register();
