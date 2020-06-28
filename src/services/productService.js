const products = require("../models/products");
const CommentsService = require('./commentService');


exports.findAll = async (subcategory) => {
	let Items = await products.find({
		primary_category_id: subcategory
	})
	return Items
}

exports.findOne = async (productId) => {
	let Items = await products.findOne({
		brand: productId
	})
	if (Items) {
		let Comments = await CommentsService.viewComments(productId);
		return [Items, Comments]
	}
	return Items
}

exports.search = async (searchParam) => {
	let Items = await products.find({
		name: new RegExp(searchParam, 'i')
	});
	if (Items) {
		return Items
	}
	return 'No product found.'
}