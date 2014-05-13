app.controller("LoginController", [
	"$scope", "$timeout", "$location", "ApiFactory", "$routeParams",
	function($scope, $timeout, $location, ApiFactory, $routeParams) {
		$scope.username = "brynjarb12"; // RESET to undefined
		$scope.password = "123456"; // RESET to undefined
		$scope.login = {
			failure: false,
			message: ""
		};

		$scope.clearMessage = function() {
			$scope.login.failure = false;
			$scope.login.message = "";
		}

		$scope.login = function() {
			if ($scope.loginForm.$valid) {
				var loginResult = ApiFactory.login($scope.username, $scope.password);
				
				loginResult.then(function(role) {
					if (role === "student") {
						$location.path("/student/");
					}
					else if (role === "admin") {
						$location.path("/admin/");
					}
				}, function(errorCode) {
					if (errorCode === 401) {
						$scope.login.failure = true;
						$scope.login.message = "Username and/or password not recognized by server. Please try again.";
						$scope.username = "";
						$scope.password = "";
					}
				});
			}
			else {
				$scope.errMessages();
			}
		}

		$scope.errMessages = function() {

			if ($scope.username === undefined && $scope.password === undefined) {
				$scope.login.failure = true;
				$scope.login.message = "Please enter your username and password.";
			}
			else if ($scope.username === undefined) {
				$scope.login.failure = true;
				$scope.login.message = "No username entered. Please enter both your username and password.";
				$scope.password = "";
			}
			else if ($scope.password === undefined) {
				$scope.login.failure = true;
				$scope.login.message = "Please input your password.";
			}
			else {
				$scope.login.failure = true;
				$scope.login.message = "Unknown error, please try agian.";
			}
		}
	}
])