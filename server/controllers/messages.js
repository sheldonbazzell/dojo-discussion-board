console.log('messages controller');
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Comment = mongoose.model('Comment'),
	Message = mongoose.model('Message');

function MessagesController(){

	this.index = function(req, res){
		Message.find({}).populate({
			path: 'comments _user'
		})
		.exec(function(err,msgs){
			if(err){
				console.log('error');
				res.json(err);
			}
			else{
				res.json(msgs);
			}
		})
	}

	this.create = function(req,res){

		User.findOne({_id:req.body.user._id}, function(err,user){
			if(!user){
				console.log('no user');
				res.json({error:'Please login first'});
			}
			else{
				// create msg object
				var msg = new Message({content:req.body.content});
				// assign 'belongs to for msg object'
				msg._user = user._id
				msg.save(function(err){
					// push msg into user msgs array
					user.messages.push(msg);
					console.log(user.messages, " LINE 41 ")
					if(err){
						console.log("ERROR: ", err)
						res.json(err);
					}
					else{
						res.redirect('/messages');
					}
				})
			}
		})

	}

}

module.exports = new MessagesController();