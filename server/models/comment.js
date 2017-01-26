var mongoose      = require('mongoose');
mongoose.Promise  = global.Promise;
var Schema 		  = mongoose.Schema,
	commentSchema = new Schema({

		_user: {
			type:Schema.Types.ObjectId, ref:'User',
			required:[true,"User is required"]
		},

		_post: {type:Schema.Types.ObjectId, ref:'Post'},

		content: {
			type: String,
			required: [true, "Comment is required"],
			minlength: [4, "Comment must be at least 4 characters"]
		}

	}, {timestamps:true});

mongoose.model('Comment', commentSchema);