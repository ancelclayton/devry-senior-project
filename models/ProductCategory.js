var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ProductCategory Model
 * ==================
 */

var ProductCategory = new keystone.List('ProductCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
});

ProductCategory.add({
  name: { type: String, required: true },
  type: { type: Types.Select, options: [
    { label: 'Print', value: 'print'},
    { label: 'Engraving', value: 'engraving'},
  ]}
});

ProductCategory.relationship({ ref: 'Product', path: 'products', refPath: 'categories' });

ProductCategory.register();
