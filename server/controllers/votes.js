console.log('upvotes controller');
var mongoose = require('mongoose'),
	UpVote = mongoose.model('UpVote'),
	DownVote = mongoose.model('DownVote'),
	User	 = mongoose.model('User'),
	Post	 = mongoose.model('Post');

function VotesController(){

	this.createUpVote = function(req,res) {
		var errors = [];
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({error:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, function(err,post) {
					console.log(post._user, " LINE 18 ")
					console.log(user._id, " LINE 19 ")
					if(!post) {
						errors.push({error:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else if(post._user.toString()  === user._id.toString()) {
						errors.push({error:"You can't vote on your own posts!"});
						res.json(errors);
					} else {
						UpVote.findOne({_user:user._id, _post:post._id}, function(err,upVote) {
							if(upVote) {
								errors.push({error:"You already voted on this post."})
								res.json(errors);
							} else {
								DownVote.findOne({_user:user._id, _post:post._id}, function(err,downVote) {
									if(downVote) {
										errors.push({error:"You already voted on this post."})
										res.json(errors);
									} else {
										var upVote = new UpVote({_user:user._id, _post:post._id});
										upVote.save(function(err) {
											if(err) {
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
																console.log(req.body.topic_id + " LINE 43 ");
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
				})
			}
		})
	}

	this.createDownVote = function(req,res) {
		var errors = []; 
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				errors.push({error:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, function(err,post) {
					if(!post) {
						errors.push({message:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else if(post._user.toString()  === user._id.toString()) {
						errors.push({error:"You can't vote on your own posts!"});
						res.json(errors);
					} else {
						DownVote.findOne({_user:user._id, _post:post._id}, function(err,downVote) {
							if(downVote) {
								errors.push({error:"You already voted on this post."})
								res.json(errors);
							} else {
								UpVote.findOne({_user:user._id, _post:post._id}, function(err,upVote) {
									if(upVote) {
										errors.push({error:"You already voted on this post."})
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
																console.log('downVote successfully saved');
																console.log(req.body.topic_id + " LINE 88 ");
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
				})
			}
		})
	}
}

module.exports = new VotesController();