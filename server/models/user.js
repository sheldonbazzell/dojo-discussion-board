console.log('usermodel')
var mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator');
	mongoose.Promise = global.Promise;
var	Schema = mongoose.Schema;
	userSchema = new Schema({
		username: {
			type: String,
			required: [true, "Username required"],
			maxlength: [19, "Username must be less than 20 characters"],
			lowercase: true,
			validate: {
				validator: function(username){
					return /^[a-z0-9_]+$/i.test(username);
				},
				message: "Username must only contain alphanumeric characters and underscores"
			}
		},
		messages: [{
			type:Schema.Types.ObjectId, ref:'Message'
		}],
		comments: [{
			type:Schema.Types.ObjectId, ref:'Comment'
		}]

	}, {timestamps: true});

userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);
