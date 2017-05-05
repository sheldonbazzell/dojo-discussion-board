console.log('votes controller');
const mongoose = require('mongoose'),
	UpVote = mongoose.model('UpVote'),
	DownVote = mongoose.model('DownVote'),
	User	 = mongoose.model('User'),
	Post	 = mongoose.model('Post');

function VotesController(){

	this.createUpVote = function(req,res) {
		let errors = [];
		User.findOne({_id:req.body.user_id}, (err,user) => {
			if(!user) {
				errors.push({error:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, (err,post) => {
					if(!post) {
						errors.push({error:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else if(post._user.toString()  === user._id.toString()) {
						errors.push({error:"You can't vote on your own posts!"});
						res.json(errors);
					} else {
						UpVote.findOne({_user:user._id, _post:post._id}, (err,upVote) => {
							if(upVote) {
								errors.push({error:"You already voted on this post."})
								res.json(errors);
							} else {
								DownVote.findOne({_user:user._id, _post:post._id}, (err,downVote) => {
									if(downVote) {
										errors.push({error:"You already voted on this post."})
										res.json(errors);
									} else {
										var upVote = new UpVote({_user:user._id, _post:post._id});
										upVote.save( err => {
											if(err) {
												res.json(err);
											} else {
												user.upVotes.push(upVote);
												user.save( err => {
													if(err) {
														res.json(err);
													} else {
														post.upVotes.push(upVote);
														post.save( err => {
															if(err) {
																res.json(err);
															} else {
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
		User.findOne({_id:req.body.user_id}, (err,user) => {
			if(!user) {
				errors.push({error:'Please login to enable voting'});
				res.json(errors);
			} else {
				Post.findOne({_id:req.body.post_id}, (err,post) => {
					if(!post) {
						errors.push({message:'There was an error in processing. Please vote again.'});
						res.json(errors);
					} else if(post._user.toString()  === user._id.toString()) {
						errors.push({error:"You can't vote on your own posts!"});
						res.json(errors);
					} else {
						DownVote.findOne({_user:user._id, _post:post._id}, (err,downVote) => {
							if(downVote) {
								errors.push({error:"You already voted on this post."})
								res.json(errors);
							} else {
								UpVote.findOne({_user:user._id, _post:post._id}, (err,upVote) => {
									if(upVote) {
										errors.push({error:"You already voted on this post."})
										res.json(errors);
									} else {
										let downVote = new DownVote({_user:user._id, _post:post._id});
										downVote.save( err => {
											if(err) res.json(err);
											else {
												user.downVotes.push(downVote);
												user.save( err => {
													if(err) {
														res.json(err);
													} else {
														post.downVotes.push(downVote);
														post.save( err => {
															if(err) res.json(err);
															else
																res.redirect('/topics/' + req.body.topic_id);
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