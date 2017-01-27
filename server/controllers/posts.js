console.log('posts controller');
var mongoose = require('mongoose'),
	Post     = mongoose.model('Post'),
	Topic    = mongoose.model('Topic');

function PostsController(){

	this.index = function(req,res) {
		Post.find({}, function(err,posts) {
			if(err) {
				console.log("Couldnt grab posts: " + err);
				res.json(err);
			} else {
				console.log('Got the posts: ' + posts);
				res.json(posts);
			}
		})
	}

	this.create = function(req,res) {
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				res.json({errors:'Please login before posting'});
			} else {
				Topic.findOne({_id:req.body.topic_id}, function(err,topic) {
					if(!topic) {
						res.json({errors:'Please try again, topic not found'});
					} else {
						var post = new Post({content:req.body.content});
						post._user = user._id;
						post._topic = topic._id;
						post.save(function(err) {
							if(err) {
								res.json(err);
							} else {
								user.posts.push(post);
								user.save(function(err) {
									if(err) {
										res.json(err);
									} else {
										topic.posts.push(post);
										topic.save(function(err) {
											if(err) {
												res.json(err);
											} else {
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