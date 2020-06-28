var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subCategSchema = new Schema({
	name: String,
	page_description: String,
	id: String,
	image: String,
	parent_category_id: String,
});
const categSchema = new Schema({
	name: String,
	page_description: String,
	id: String,
	image: String,
	parent_category_id: String,
	categories: [subCategSchema]
});
const mainCategSchema = new Schema({
	name: String,
	page_description: String,
	id: String,
	categories: [categSchema]
}, {
	collection: 'categories'
});

let Categories = mongoose.model('categories', mainCategSchema, 'categories');

module.exports = Categories;