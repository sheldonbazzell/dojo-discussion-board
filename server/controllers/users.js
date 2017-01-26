console.log("users controller");
var mongoose = require('mongoose'),
	User = mongoose.model('User');

// console.log(exprJWT, ' LINE 6 ');
// console.log(jwt.sign({}, 'sheldonSecretKey'), ' LINE 7 ');

function UsersController(){

	this.create = function(req,res){
		User.findOne({name:req.body.name}, function(err,user){
			console.log(user)
			if(!user){
				var user = new User(req.body);
				user.save(function(err){
					if(err){
						console.log('Error saving user line 13: ' + err);
						res.json(err);
					} else{
						console.log('Saving user: ' + user);
						// var tokenData = {
						// 	name:user.name,
						// 	id:user._id
						// }
						// var userToken = jwt.sign(tokenData, 'sheldonSecretKey');
						// user.userToken = userToken;
						// console.log('USER TOKEN: ' + user.userToken + ' LINE 20 ');
						// res.status(200).json(user);
						res.json(user);
					}
				})
			} else{
				console.log('User already in database: ' + user);
				// var userToken = jwt.sign({ user:req.body.user.name }, 'sheldonSecretKey');
				// console.log('USER TOKEN: ' + userToken + ' LINE 27 ');
				// user.userToken = userToken;
				// res.status(200).json(user);
				res.json(user);
			}
		})
	}

}

module.exports = new UsersController();