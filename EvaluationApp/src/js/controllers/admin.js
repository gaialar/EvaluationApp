app.controller("AdminController", [
	"$scope", "$timeout", "$location", "ApiFactory",
	function($scope, $timeout, $location, ApiFactory) {

		$scope.evaluations = undefined;

		$scope.noNew = false;
		$scope.someNew = false;
		$scope.noOpen = false;
		$scope.someOpen = false;
		$scope.noClosed = false;
		$scope.someClosed = false;

		$scope.message = "";

		var fetchResult = ApiFactory.fetchAllEvaluations();
		fetchResult.then(function(data) {
			$scope.evaluations = data;
			checkForNewEvaluations();
			checkForOpenEvaluations();
			checkForClosedEvaluations();
		}, function() {
			$scope.message = "An error occurred while fetching evaluations - please try again";
			$scope.noNew = true;
			$scope.noOpen = true;
			$scope.noClosed = true;
		});

		checkForNewEvaluations = function() {
			for (var evaluation in $scope.evaluations) {
				if ($scope.evaluations[evaluation].Status === "new") {
					$scope.someNew = true;
					return;
				}
			}
			$scope.message = "No evaluations available";
			$scope.noNew = true;
		}

		checkForOpenEvaluations = function() {
			for (var evaluation in $scope.evaluations) {
				if ($scope.evaluations[evaluation].Status === "open") {
					$scope.someOpen = true;
					return;
				}
			}
			$scope.message = "No evaluations available";
			$scope.noOpen = true;
		}

		checkForClosedEvaluations = function() {
			for (var evaluation in $scope.evaluations) {
				if ($scope.evaluations[evaluation].Status === "closed") {
					$scope.someClosed = true;
					return
				}
			}
			$scope.message = "No evaluations available";
			$scope.noClosed = true;
		}

		$scope.setDates = function(start, end){
			ApiFactory.setStartDate(start);
			ApiFactory.setEndDate(end);

		}

		$scope.moveToEvaluationsIndex = function() {
			$location.path("/admin/evaluations/");
		}

	}
]);