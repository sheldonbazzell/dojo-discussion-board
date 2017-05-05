console.log('TopicsController')
const mongoose = require('mongoose');
	Category = mongoose.model('Category'),
	User     = mongoose.model('User'),
	Topic    = mongoose.model('Topic');

function TopicsController() {

	this.index = function(req,res) {
		Topic.find({})
		.populate([
				{path: '_category', model: 'Category'},
				{path: '_user',     model: 'User'},
				{path: 'posts',     model: 'Post'},
			])
		.exec( (err,topics) => { 
			if(err) res.json(err);
			else res.json(topics);
		})
	}

	this.create = function(req,res) {
		User.findOne({_id:req.body.user_id}, (err,user) => {
			if(!user) res.json({errors:'Please login before posting'});
			else {
				Category.findOne({category:req.body._category}, (err,category) => {
					let errors = {};
					if(!category) res.json({errors:'Invalid category'});
					else {
						Topic.findOne({title:req.body.title}, (err,topic) => {
							if(!topic) {
								let topic = new Topic({title:req.body.title, description:req.body.description});
								topic._category = category._id;
								topic._user = user._id;
								topic.save( err => {							
									if(err) res.json(err);
									else {
										category.topics.push(topic);
										category.save( err => {
											if(err) res.json(err);
											else {
												user.topics.push(topic);
												user.save( err => {
													if(err) res.json(err);
													else res.redirect('/topics');
												})
											}
										})
									}
								})
							} else {
								let back = {
									error: "Topic already exists",
									topic: topic
								}
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
		.populate([
			{path:'_category', model: 'Category'},
			{path:'_user',     model: 'User'}
		])
		.populate({
			path: 'posts',
			populate: { 
				path: '_user',
			}
		})
		.populate({
			path: 'posts',
			populate: {
				path: 'comments',
				populate: {
					path: '_user'
				}
			}
		})
		.exec( (err,topic) => {
			if(err) res.json(err);
			else res.json(topic);
		})
	}
	
}

module.exports = new TopicsController();