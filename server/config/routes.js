var users      = require('../controllers/users.js'),
	categories =  require('../controllers/categories.js'),
	posts      =  require('../controllers/posts.js'),
	comments   =  require('../controllers/comments.js'),
	topics     = require('../controllers/topics.js');
module.exports = function(app) {
	app.get('/categories', categories.index);
	app.get('/topics', topics.index);
	app.get('/topics/:id', topics.show);
	app.post('/users', users.create);
	app.post('/comments', comments.create);
	app.post('/topics', topics.create);
	app.post('/posts', posts.create);
	app.get('/posts', posts.index);
}