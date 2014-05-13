app.factory("ApiFactory", [
	"$http", "$q",
	function($http, $q) {
		var username;
		var role
		var token;
		var startDate;
		var endDate;

		return {

			login: function(name, password) {
				var deferred = $q.defer();
				$http.post("http://dispatch.ru.is/h20/api/v1/login", { user: name, pass: password })
				.success(function(data, status, headers) {
					username = data.User.Username;
					role = data.User.Role;
					token = data.Token;
					deferred.resolve(role);
				}).error(function(data, status, headers) {
					role = status;
					deferred.reject(role);
				})
				return deferred.promise;
			},

			sendEvaluationTemplate: function(template) {
				$http.defaults.headers.common.Authorization = 'Basic '+ token;

				var deferred = $q.defer();
				$http.post("http://dispatch.ru.is/h20/api/v1/evaluationtemplates/", template)
				.success(function(data, status, headers) {
					deferred.resolve();
				}).error(function(data, status, headers) {
					deferred.reject(status);
				})
				return deferred.promise;
			},

			sendEvaluation: function(evaluation) {
				$http.defaults.headers.common.Authorization = 'Basic '+ token;

				var deferred = $q.defer();
				$http.post("http://dispatch.ru.is/h20/api/v1/evaluations/", evaluation)
				.success(function(data, status, headers) {
					deferred.resolve();
				}).error(function(data, status, headers) {
					deferred.reject(status);
				})
				return deferred.promise;
			},

			fetchAllEvaluationTemplates: function() {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/evaluationtemplates")
				.success(function(data, status, headers) {
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject("error");
				})
				return deferred.promise;
			},

			fetchSingleEvaluationTemplate: function(theID) {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/evaluationtemplates/" + theID)
				.success(function(data, status, headers) {
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject("error");
				})
				return deferred.promise;
			},

			fetchAllEvaluations: function() {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/evaluations/")
				.success(function(data, status, headers) {
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject();
				})
				return deferred.promise;
			},

			fetchAllOpenEvaluations: function() {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/my/evaluations")
				.success(function(data, status, headers) {
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject();
				})
				return deferred.promise;
			},

			fetchSingleStudentEvaluation: function(evaluation) {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/courses/"
							 + evaluation.courseID + "/" + evaluation.semesterID
							 + "/evaluations/" + evaluation.evalID)
				.success(function(data, status, headers) {
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject(status);
				})
				return deferred.promise;
			},

			sendSingleStudentEvaluation: function(evaluation, submission) {
				$http.defaults.headers.common.Authorization = 'Basic '+ token;
				var deferred = $q.defer();
				$http.post("http://dispatch.ru.is/h20/api/v1/courses/"
			 				+ evaluation.courseID + "/" + evaluation.semesterID
			 				+ "/evaluations/" + evaluation.evalID, submission)
				.success(function(data, status, headers) {
					deferred.resolve();
				}).error(function(data, status, headers) {
					deferred.reject(status);
				})
				return deferred.promise;
			},

			fetchSingleAdminEvaluation: function(theID) {
				$http.defaults.headers.common.Authorization = "Basic " + token;
				var deferred = $q.defer();
				$http.get("http://dispatch.ru.is/h20/api/v1/evaluations/" + theID)
				.success(function(data, status, headers) {
					console.log(data);
					deferred.resolve(data);
				}).error(function(data, status, headers) {
					deferred.reject("error");
				})
				return deferred.promise;
			},

			getToken: function() {
				return token;
			},

			getUsername: function() {
				return username;
			},
			
			getRole: function() {
				return role;
			},

			getStartDate: function() {
				return startDate;
			},

			getEndDate: function() {
				return endDate;
			},

			setStartDate: function(start){
				startDate = start;
			},

			setEndDate: function(end){
				endDate = end;
			}
		};
	}
]);
