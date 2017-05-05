console.log('posts controller');
const mongoose = require('mongoose'),
	Post     = mongoose.model('Post'),
	Topic    = mongoose.model('Topic');

function PostsController(){

	this.index = function(req,res) {
		Post.find({}, (err,posts) => {
			if(err) res.json(err);
			else res.json(posts);
		})
	}

	this.create = function(req,res) {
		User.findOne({_id:req.body.user_id}, (err,user) => {
			if(!user) res.json({errors:'Please login before posting'});
			else {
				Topic.findOne({_id:req.body.topic_id}, (err,topic) => {
					if(!topic) res.json({errors:'Please try again, topic not found'});
					else {
						let post = new Post({content:req.body.content});
						post._user = user._id;
						post._topic = topic._id;
						post.save( err => {
							if(err) res.json(err);
							else {
								user.posts.push(post);
								user.save(function(err) {
									if(err) {
										res.json(err);
									} else {
										topic.posts.push(post);
										topic.save( err => {
											if(err) res.json(err);
											else {
												res.redirect('/topics/' + topic._id);
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

module.exports = new PostsController();