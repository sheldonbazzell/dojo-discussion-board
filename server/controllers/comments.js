var mongoose = require('mongoose'),
	Comment = mongoose.model('Comment'),
	User = mongoose.model('User'),
	Message = mongoose.model('Message');

function CommentsController(){

	this.create = function(req, res){
		User.findOne({_id:req.body.user._id}, function(err,user){
			if(err){
				console.log(" ERR FINDING USER ", err);
				res.json(err);
			}
			else{
				Message.findOne({_id:req.body.message}, function(err,msg){
					if(err){
						console.log(err, " LINE 9 didnt find message");
						res.json(err);
					}
					else{
						var comment = new Comment(req.body);
						// set 'belongs to'
						comment._message = msg._id;
						comment._user = user._id;
						comment.save(function(err){
							// push comment into msg array
							if(err){
								console.log(err, " couldnt save comment line 29")
								res.json(err);
							}
							else{
								msg.comments.push(comment);
								msg.save(function(err){
									if(err){
										console.log(err, " couldnt save message line 29")
										res.json(err);
									}
									else{
										console.log(" LINE 39" + user.comments + " LINE 39");
										user.comments.push(comment);
										console.log(" LINE 41" + user.comments + " LINE 41");
										user.save(function(err){
											if(err){
												res.json(err, " couldnt save user line 34 ")
											}
											else{
												console.log(user, " SAVED comment line 20");
												res.redirect('/messages');
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