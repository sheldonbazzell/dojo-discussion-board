console.log('downvote model');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	downvoteSchema = new Schema({
		_user: {type:Schema.Types.ObjectId, ref:'User'},
		_post: {type:Schema.Types.ObjectId, ref:'Post'},
		// validate: {
		// 	validator: function(vote) {
		// 		// return (vote._user._id !== vote._post._user._id);
		// 	},
		// 	message: "No voting on your own post!"
		// }
	}, {timestamps:true});
mongoose.model('DownVote', downvoteSchema);