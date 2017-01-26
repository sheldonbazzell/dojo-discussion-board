console.log('upvote model');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	upvoteSchema = new Schema({
		_user: {type:Schema.Types.ObjectId, ref:'User'},
		_post: {type:Schema.Types.ObjectId, ref:'Post'}
	}, {timestamps:true});
mongoose.model('UpVote', upvoteSchema);