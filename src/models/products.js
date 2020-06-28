var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    id: String,
    image_groups: Array,
    primary_category_id: String,
    short_description: String,
    long_description: String,
    brand:String,
});


let Products = mongoose.model('Products', productSchema, 'products');

module.exports = Products;