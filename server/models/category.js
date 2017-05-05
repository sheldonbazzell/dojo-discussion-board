console.log('category model')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema,
	categorySchema = new Schema({
		category: {
			type: String,
			required: [true,"Category name is required"]
		},
		topics: [{type:Schema.Types.ObjectId, ref:'Topic'}]
	}, {timestamps:true});
mongoose.model('Category', categorySchema);