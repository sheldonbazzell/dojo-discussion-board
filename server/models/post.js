console.log('post model')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var	Schema = mongoose.Schema,
	postSchema = new Schema({
		_user: {
			type:Schema.Types.ObjectId, ref:'User'
		},
		_topic: {
			type:Schema.Types.ObjectId, ref:'Topic'
		},
		content: {
			type: String,
			required:[true,"Response is required"],
			minlength:[8, "Response must be at least 8 characters"]
		},
		downVotes: [{type:Schema.Types.ObjectId, ref:'DownVote'}],
		upVotes: [{type:Schema.Types.ObjectId, ref:'UpVote'}],
		comments: [{type:Schema.Types.ObjectId, ref:'Comment'}]
	}, {timestamps:true});
mongoose.model('Post', postSchema);
