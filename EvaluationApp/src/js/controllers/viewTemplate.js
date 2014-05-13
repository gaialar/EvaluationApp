app.controller("ViewTemplateController", [
	"$scope", "$timeout", "ApiFactory", "$routeParams", "$location",
	function($scope, $timeout, ApiFactory, $routeParams, $location) {
		var templateID = $routeParams.templateID;
		$scope.template = undefined;
		$scope.creatingTemplate = false;
		$scope.showErrorMessage = false;
		$scope.errorMessage = undefined;
		$scope.startTimestamp = "";
		$scope.endTimestamp = "";

		if (templateID !== undefined) {
			var fetchResult = ApiFactory.fetchSingleEvaluationTemplate(templateID);
			fetchResult.then(function(data) {
				$scope.template = data;
			}, function(errorMessage) {
				// TODO: Error handling
			});
		}
		else{}

		$scope.moveToEvaluationIndex = function() {
			$location.path("/admin/evaluations/");
		}

		$scope.useTemplate = function() {
			$scope.creatingTemplate = true;
			$timeout(function(){
	    		window.scrollTo(0,document.body.scrollHeight);
			},	50);
		}

		$scope.cancelUseTemplate = function() {
			angular.element("#startDateTime").val("");
			angular.element("#endDateTime").val("");
			$scope.clearErrorMessage();
			$scope.creatingTemplate = false;
		}

		$scope.launchEvaluation = function() {
			$scope.clearErrorMessage();
			if (templateValidationFailure() === true) {}
			else {
				var evaluation = createEvaluation();
				var sendResult = ApiFactory.sendEvaluation(evaluation);
				sendResult.then(function() {
					$location.path("/admin/evaluations/");
				}, function(errorCode) {
					$scope.errorMessage = "problem saving evaluation - please try again";
					$scope.showErrorMessage = true;
				});
			}
		}

		$scope.clearErrorMessage = function() {
			$scope.errorMessage = "";
			$scope.showErrorMessage = false;
		}

		createEvaluation = function() {
			return {
				TemplateID: templateID,
				StartDate: $scope.startTimestamp,
				EndDate: $scope.endTimestamp
			}
		}

		templateValidationFailure = function() {
			var rtn = false;
			var startDateTimeDate = undefined;
			var endDateTimeDate = undefined;

			var startDateTimeStr = angular.element("#startDateTime").val();
			if (startDateTimeStr === "") {
				rtn = true;
				$scope.errorMessage = "problem with start date";
				$scope.showErrorMessage = true;
			}
			else {
				startDateTimeDate = new Date(startDateTimeStr);
				$scope.startTimestamp = startDateTimeDate.toISOString();
			}

			var endDateTimeStr = angular.element("#endDateTime").val();
			if (endDateTimeStr === "") {
				if (rtn === true) {
					$scope.errorMessage = $scope.errorMessage + " and end date";
				}
				else {
					rtn = true;
					$scope.errorMessage = "problem with end date";
				}
				$scope.showErrorMessage = true;
			}
			else {
				endDateTimeDate = new Date(endDateTimeStr);
				$scope.endTimestamp = endDateTimeDate.toISOString();
			}

			if (startDateTimeDate >= endDateTimeDate) {
				rtn = true;
				$scope.errorMessage = "problem with period";
				$scope.showErrorMessage = true;
			}

			return rtn;
		}
	}
])