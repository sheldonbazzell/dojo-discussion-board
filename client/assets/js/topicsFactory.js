app.factory('topicsFactory', ['$http', function($http){

		function topicsFactory(){
			var topic = {},
				topics = [];

			this.index = function(callback) {
				$http.get('/topics').then(function(res) {
					if(!res.data.errors){
						topics = res.data;
					}
					callback(res.data);
				});
			}

			this.create = function(user, newTopic, callback) {
				if(user !== undefined && newTopic == undefined) {
					newTopic = {};
					newTopic.user_id = user._id;
				} else if(user !== undefined && newTopic !== undefined) {
					newTopic.user_id = user._id;
				}
				$http.post('/topics', newTopic).then(function(res) {
					if(!res.data.errors) {
						topic = res.data;
					}
					callback(res.data);
				})
			}

			this.show = function(id, callback) {
				$http.get('/topics/' + id).then(function(res) {
					if(!res.data.errors) {
						topic = res.data;
					}
					callback(res.data);
				})
			}
		}


	return new topicsFactory;

}])