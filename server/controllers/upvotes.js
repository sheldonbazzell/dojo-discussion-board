console.log('upvotes controller');
var mongoose = require('mongoose'),
	UpVote = mongoose.model('UpVote'),
	User	 = mongoose.model('User'),
	Post	 = mongoose.model('Post');

function UpVotesController(){

}

module.exports = new UpVotesController();