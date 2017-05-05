console.log('comments controller');
const mongoose = require('mongoose'),
	Comment  = mongoose.model('Comment'),
	Post	 = mongoose.model('Post'),
	User	 = mongoose.model('User');

function CommentsController(){

	this.create = function(req,res) {
		let errors = [];
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({message:'Please login before commenting'});
				res.json({data:errors});
			} else {
				Post.findOne({_id:req.body.post_id}, (err,post) => {
					if(!post) {
						errors.push({message:'Post not found, please try again.'});
						res.json({data:errors});
					} else {
						let comment = new Comment({content:req.body.content});
						comment._user = user._id;
						comment._post = post._id;
						comment.save( err => {
							if(err) res.json(err);
							else {
								user.comments.push(comment);
								user.save( err => {
									if(err) res.json(err);
									else {
										post.comments.push(comment);
										post.save( err => {
											if(err) res.json(errr);
											else {
												if(req.body.topic_id)
													res.redirect('/topics/' + req.body.topic_id);
												else
													res.redirect('/topics');
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