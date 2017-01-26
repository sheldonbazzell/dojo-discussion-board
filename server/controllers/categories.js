console.log('categories controller');
var mongoose = require('mongoose'),
	Category = mongoose.model('Category');

function CategoriesController(){

	this.index = function(req,res){
		Category.find({}, function(err,categories){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				res.json(categories);
			}
		})
	}
	
}

module.exports = new CategoriesController();