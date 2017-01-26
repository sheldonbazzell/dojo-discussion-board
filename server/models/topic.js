console.log('topic model')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	topicSchema = new Schema({
		_category: {
			type:Schema.Types.ObjectId, ref:'Category',
			required:[true,"Category is required"]
		},
		_user: {
			type:Schema.Types.ObjectId, ref:'User',
			required:[true,"User is required"]
		},
		title: {
			type: String,
			required: [true, "Topic is required"],
			minlength: [4, "Topic must be at least 4 characters"]
		},
		description: {
			type: String,
			required: [true, "Topic must have a description"],
			minlength: [15, "Description must be at least 15 characters"]
		},
		posts: [{type:Schema.Types.ObjectId, ref:'Post'}]
	}, {timestamps:true});
mongoose.model('Topic', topicSchema);