var users      =  require('../controllers/users.js'),
	categories =  require('../controllers/categories.js'),
	posts      =  require('../controllers/posts.js'),
	users      =  require('../controllers/users.js'),
	comments   =  require('../controllers/comments.js'),
	votes      =  require('../controllers/votes.js'),
	topics     =  require('../controllers/topics.js');
module.exports = function(app) {
	app.get('/categories', categories.index);
	app.get('/topics', topics.index);
	app.get('/topics/:id', topics.show);
	app.get('/users/:id', users.show);
	app.post('/users', users.create);
	app.put('/users', users.update);
	app.post('/comments', comments.create);
	app.post('/topics', topics.create);
	app.post('/posts', posts.create);
	app.post('/upvotes', votes.createUpVote);
	app.post('/downvotes', votes.createDownVote);
}