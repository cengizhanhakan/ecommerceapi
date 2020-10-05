const categories = require("../models/categories");


exports.findOne = async (catName) => {
	return await categories.find({
		id: catName
	});
};



exports.findAll = async () => {
	return await categories.find({});
};