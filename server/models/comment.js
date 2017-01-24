console.log('comment model')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	commentSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	_message: {
		type: Schema.Types.ObjectId, ref: 'Message'
	},
	content: {
		type: String,
		minlength: [5, 'Comment must be at least 5 characters']
	}
})

mongoose.model('Comment', commentSchema);