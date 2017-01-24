console.log('message model')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema,
	messageSchema = new Schema({
		comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
		_user: {type: Schema.Types.ObjectId, ref:'User'},
		content: {
			type: String,
			required: [true, "Message is required"],
			minlength: [10, "Message must be at least 10 characters"]
		}
	}, {timestamps: true});
mongoose.model('Message', messageSchema);