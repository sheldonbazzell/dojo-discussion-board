console.log('upvote model');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	upvoteSchema = new Schema({
		_user: {type:Schema.Types.ObjectId, ref:'User'},
		_post: {type:Schema.Types.ObjectId, ref:'Post'}
		// validate: {
		// 	validator: function(vote) {
		// 		if(vote._user._id == vote._post._user._id) {
		// 			return false;
		// 		}
		// 		// return (vote._user._id !== vote._post._user._id).test(vote);
		// 	},
		// 	message: "No voting on your own post!"
		// }
	}, {timestamps:true});
mongoose.model('UpVote', upvoteSchema);

