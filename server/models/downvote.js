console.log('downvote model');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	downvoteSchema = new Schema({
		_user: {type:Schema.Types.ObjectId, ref:'User'},
		_post: {type:Schema.Types.ObjectId, ref:'Post'},
	}, {timestamps:true});
mongoose.model('DownVote', downvoteSchema);