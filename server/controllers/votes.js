console.log('upvotes controller');
var mongoose = require('mongoose'),
	UpVote = mongoose.model('UpVote'),
	DownVote = mongoose.model('DownVote'),
	User	 = mongoose.model('User'),
	Post	 = mongoose.model('Post');

function VotesController(){

	this.createUpVote = function(req,res) {
		var errors = []; 
		console.log(' REQ.BODY ' + req.body.topic_id + ' REQ.BODY ');
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({message:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, function(err,post) {
					if(!post) {
						errors.push({message:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else {
						var upVote = new UpVote({_user:user._id, _post:post._id});
						upVote.save(function(err) {
							if(err) {
								console.log('Error: ' + err);
								res.json(err);
							} else {
								user.upVotes.push(upVote);
								user.save(function(err) {
									if(err) {
										res.json(err);
									} else {
										post.upVotes.push(upVote);
										post.save(function(err) {
											if(err) {
												res.json(err);
											} else {
												console.log('upVote successfully saved');
												res.redirect('/topics/' + req.body.topic_id);
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

	this.createDownVote = function(req,res) {
		var errors = []; 
		console.log(' REQ.BODY ' + req.body.topic_id + ' REQ.BODY ');
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({message:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, function(err,post) {
					if(!post) {
						errors.push({message:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else {
						var downVote = new DownVote({_user:user._id, _post:post._id});
						downVote.save(function(err) {
							if(err) {
								console.log('Error: ' + err);
								res.json(err);
							} else {
								user.downVotes.push(downVote);
								user.save(function(err) {
									if(err) {
										res.json(err);
									} else {
										post.downVotes.push(downVote);
										post.save(function(err) {
											if(err) {
												res.json(err);
											} else {
												console.log('upVote successfully saved');
												res.redirect('/topics/' + req.body.topic_id);
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

module.exports = new VotesController();