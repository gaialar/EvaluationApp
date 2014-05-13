app.controller("EvaluationsController", [
	"$scope", "$timeout", "$location", "ApiFactory",
	function($scope, $timeout, $location, ApiFactory) {

		$scope.templates = undefined;
		$scope.noTemplates = false;
	
		var fetchResult = ApiFactory.fetchAllEvaluationTemplates();
		fetchResult.then(function(data) {
			$scope.templates = data;
			if ($scope.templates.length == 0) {
				$scope.noTemplates = true;
			}
			else {
				$scope.noTemplates = false;
			}
		});

		$scope.moveToCreateTemplateIndex = function() {
			$location.path("/admin/evaluations/createTemplate/");
		}

		$scope.moveToAdminIndex = function() {
			$location.path("/admin/");
		}
	}
]);