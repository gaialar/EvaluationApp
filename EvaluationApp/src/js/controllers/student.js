app.controller("StudentController", [
	"$scope", "ApiFactory",
	function($scope, ApiFactory) {
		$scope.evaluations = undefined;
		$scope.currentCourse = undefined;
		$scope.noEvaluations = false;
		$scope.message = "";

		var fetchResult = ApiFactory.fetchAllOpenEvaluations();
		fetchResult.then(function(data) {
			$scope.evaluations = data;
			if ($scope.evaluations.length === 0) {
				$scope.message = "No evaluations available";
				$scope.noEvaluations = true;
			}
			else {}
		}, function() {
			$scope.message = "An error occurred while fetching evaluations - please try again";
			$scope.noEvaluations = true;
		});
	}
]);