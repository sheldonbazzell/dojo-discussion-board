console.log('user model');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema,
	userSchema = new Schema({
		name: {
			type: String,
			required: [true, "Name is required"],
			minlength: [2, "Name must be at least 2 characters long"],
			validate: {
				validator: function(name){
					return /^[a-zA-Z]+$/.test(name);
				}
			}
		},
		birthday: {
			type: Date
		},
		topics: [{type:Schema.Types.ObjectId, ref:'Topic'}],
		posts: [{type:Schema.Types.ObjectId, ref:'Post'}],
		comments: [{type:Schema.Types.ObjectId, ref:'Comment'}],
		downVotes: [{type:Schema.Types.ObjectId, ref:'DownVote'}],
		upVotes: [{type:Schema.Types.ObjectId, ref:'UpVote'}]
	}, {timestamps:true});
mongoose.model('User', userSchema);