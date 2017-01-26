console.log('TopicsController')
var mongoose = require('mongoose');
	Category = mongoose.model('Category'),
	User = mongoose.model('User'),
	Topic = mongoose.model('Topic');

function TopicsController() {

	this.index = function(req,res) {
		Topic.find({})
		.populate('_category')
		.populate('_user')
		.populate('posts')
		.exec(function(err,topics) { 
			if(err){
				console.log(err);
				res.json(err);
			} else {
				res.json(topics);
			}
		})
	}

	this.create = function(req,res) {
		console.log(req.body, ' LINE 25 ')
		User.findOne({_id:req.body.user_id}, function(err,user) {
			if(!user) {
				console.log('No user');
				res.json({errors:'Please login before posting'});
			} else {
				Category.findOne({category:req.body._category}, function(err,category) {
					errors = {};
					if(!category){
						console.log('Invalid category');
						res.json({errors:'Invalid category'});
					} else {
						Topic.findOne({title:req.body.title}, function(err,topic) {
							if(!topic) {
								var topic = new Topic({title:req.body.title, description:req.body.description});
								topic._category = category._id;
								console.log(user);
								topic._user = user._id;
								topic.save(function(err){							
									if(err) {
										console.log(err);
										res.json(err);
									} else {
										category.topics.push(topic);
										category.save(function(err){
											if(err) {
												console.log(err);
												res.json(err);
											} else {
												user.topics.push(topic);
												user.save(function(err) {
													if(err) {
														console.log('Error, couldnt save topic to user: ' + err)
													} else {
														console.log('Successfully saved: ' + topic);
														res.redirect('/topics');
													}
												})
											}
										})
									}
								})
							} else {
								console.log('Topic exists already: ' + topic)
								var back = {
									error: "Topic already exists",
									topic: topic
								}
								console.log(back)
								res.json(back);
							}
						})
					}

				})

			}

		})
	}

	this.show = function(req,res) {
		Topic.findOne({_id:req.params.id})
		.populate('_category')
		.populate('_user')
		.populate({
			path: 'posts',
			populate: { path: '_user' }
		})
		.exec(function(err,topic) {
			if(err) {
				console.log(err + ' error.');
				res.json(err);
			} else {
				console.log('found topic: ' + topic);
				res.json(topic);
			}
		})
	}
	
}

module.exports = new TopicsController();