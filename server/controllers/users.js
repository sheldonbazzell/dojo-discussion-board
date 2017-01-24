console.log("users controller");
var mongoose = require('mongoose'),
	User = mongoose.model('User');

function UsersController(){

	this.index = function(req,res){
		User.find({}, function(err,users){
			if(err){
				res.json(err);
			}
			else{
				res.json(users)
			}
		})
	}

	this.create = function(req, res){
		var user = User.findOne({username:req.body.username}, function(err,user){
			if(user){
				console.log(user, " user already in system, logging in")
				res.json(user);
			}
			else{
				var user = new User(req.body);
				console.log(" CREATING NEW USER line 12")
				user.save(function(err){
					if(err){
						console.log(err, " LINE 10");
						res.json(err);
					}
					else{
						console.log(user, " USER created line 9")
						console.log(user);
						res.json(user);
					}
				})
			}
			
		})
	}
}

module.exports = new UsersController();