console.log("users controller");
const mongoose = require('mongoose'),
	User = mongoose.model('User');

function UsersController() {

	this.show = function(req,res) {
		User.findOne({_id:req.params.id})
		.populate(
			[
				{path: 'topics',    model: 'Topic'},
				{path: 'posts',     model: 'Post'},
				{path: 'comments',  model: 'Comment'},
				{path: 'upvotes',   model: 'UpVote'},
				{path: 'downvotes', model: 'DownVote'},
			]
		)
		.exec( (err,user) => {
			if(err) res.json(err);
			else res.json(user);
		})
	}

	this.create = function(req,res) {
		User.findOne({name:req.body.name}, (err,user) => {
			if(!user){
				let user = new User(req.body);
				user.save( err => {
					if(err) res.json(err);
					else res.json(user);
				})
			} else res.json(user);
		})
	}

	this.update = function(req, res) {
		User.findOne({_id:req.body._id}, (err,user) => {
			if(err) res.json(err);
			else {
				if(user.name !== req.body.name) user.name = req.body.name;
				if(user.birthday !== req.body.birthday) user.birthday = req.body.birthday;
				user.save( err => {
					if(err) res.json(err);
					else res.json(user);
				})
			}
		})
	}

}

module.exports = new UsersController();