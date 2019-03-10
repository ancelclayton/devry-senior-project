var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Product Model
 * ==================
 */

var Product = new keystone.List('Product', {
	track: true,
	autokey: { from: 'name', path: 'key', unique: true },
});

Product.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'ProductCategory', initial: true }
},'Content',{
	image: { type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
	price: { type: Number, format: '$0,0.00' },
	quantity: { type: Number }
},'Misc',{
	publish: { type: Boolean, default: false },
	featureOnHomepage: { type: Boolean, default: false }
});

Product.defaultColumns = 'name, categories, price, quantity, publish, featureOnHomepage';
Product.register();
