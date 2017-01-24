var users = require('../controllers/users.js')
var messages = require('../controllers/messages.js')
var comments = require('../controllers/comments.js')
module.exports = function(app) {
	app.get('/users', users.index),
	app.post('/users', users.create),
	app.post('/messages', messages.create),
	app.post('/comments', comments.create),
	app.get('/messages', messages.index)
}