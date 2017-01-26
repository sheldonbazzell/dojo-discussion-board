console.log('downvotes controller');
var mongoose = require('mongoose'),
	DownVote = mongoose.model('DownVote'),
	User	 = mongoose.model('User'),
	Post	 = mongoose.model('Post');

function DownVotesController(){

}

module.exports = new DownVotesController();