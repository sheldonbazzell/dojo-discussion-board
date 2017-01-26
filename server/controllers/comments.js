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
		console.log(req.body, ' LINE 16')
		var errors = [];
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({message:'Please login before commenting'});
				res.json({data:errors});
			} else {
				Post.findOne({_id:req.body.post_id}, function(err,post) {
					if(!post) {
						errors.push({message:'Post not found, please try again.'});
						res.json({data:errors});
					} else {
						var comment = new Comment({content:req.body.content});
						comment._user = user._id;
						comment._post = post._id;
						comment.save(function(err) {
							if(err) {
								console.log(err);
								res.json(err);
							} else {
								user.comments.push(comment);
								user.save(function(err) {
									if(err) {
										console.log(err);
										res.json(err);
									} else {
										post.comments.push(comment);
										post.save(function(err) {
											if(err) {
												console.log(err);
												res.json(errr);
											} else {
												console.log('Comment successfully saved: ' + comment);
												if(req.body.topic_id) {
													res.redirect('/topics/' + req.body.topic_id);
												} else {
													res.redirect('/topics');
												}
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	}
}

module.exports = new CommentsController();