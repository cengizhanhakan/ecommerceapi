const categories = require("../models/categories");


exports.findOne = async (catName) => {
	return categories.find({
		id: catName
	})
};



exports.findAll = async () => {
	return categories.find({})
};