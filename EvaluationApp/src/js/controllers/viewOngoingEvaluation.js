app.controller("ViewOngoingEvaluationController", [
	"$scope", "ApiFactory", "$routeParams", "$location",
	function($scope, ApiFactory, $routeParams, $location) {
		
		$scope.startDate = new Date(ApiFactory.getStartDate()).toLocaleString();
		$scope.endDate = new Date(ApiFactory.getEndDate()).toLocaleString();
		var evalID = $routeParams.evalID;
		var templateID = undefined;
		$scope.template = undefined;


		var fetchResult = ApiFactory.fetchSingleAdminEvaluation(evalID);
		fetchResult.then(function(data) {
			$scope.evaluations = data;

			templateID = data.TemplateID;
			if ($scope.evaluations.length === 0) {
				$scope.message = "No evaluations available";
				$scope.noEvaluations = true;
			}
			else {
				var templateResult = ApiFactory.fetchSingleEvaluationTemplate(templateID);
				templateResult.then(function(templateData) {
					$scope.template = templateData;
				}, function(errorMessage) {
					// TODO: Error handling
				});
			}
		}, function() {
				$scope.message = "An error occurred while fetching evaluations - please try again";
				$scope.noEvaluations = true;
		});

		$scope.moveToIndex = function() {
			$location.path("/admin/");
		}
	}
]);