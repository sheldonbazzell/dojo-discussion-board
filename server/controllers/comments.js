console.log('comments controller');
var mongoose = require('mongoose'),
	Comment  = mongoose.model('Comment'),
	Post	 = mongoose.model('Post'),
	User	 = mongoose.model('User');

function CommentsController(){

	this.create = function(req,res) {
		// NEED TO instantiate comment
		// need to query for post && user
		// need to update comment with _post && _user
		// need to update post.comments with comment
		// need to update user.comments with comment
		// res.redirect to topic show page
	}
}

module.exports = new CommentsController();