app.controller("DoEvaluationController", [
	"$scope", "$timeout", "$location", "$routeParams", "ApiFactory",
	function($scope, $timeout, $location, $routeParams, ApiFactory) {
		$scope.evaluation = undefined;	
		$scope.submission = [];

		var evaluationParameters = $routeParams;
		var elementDataArr = undefined;

		$scope.hasFocus = false;

		$scope.updateSubmissionText = function(obj) {
			var elementID = obj.target.attributes.data.value;
			var text = angular.element("#question" + elementID).val();

			if ($scope.submission.length === 0) {
				var entry = {
					QuestionID: elementID,
					TeacherSSN: "",
					Value: text
				};
				$scope.submission.push(entry);
			}
			else {
				for (var i = 0; i < $scope.submission.length; i++) {
					if ($scope.submission[i].QuestionID == elementID) {
						$scope.submission[i].Value = text;
						return;
					}
				}
				var entry = {
					QuestionID: elementID,
					TeacherSSN: "",
					Value: text
				};
				$scope.submission.push(entry);
			}
		}

		$scope.updateSubmissionSingleOrMutiplie = function(obj) {
			var elementDataStr = obj.target.attributes.data.value;
			elementDataArr = elementDataStr.split("-");

			if ($scope.submission.length === 0) {
				createEntry();
			}
			else {
				for (var i = 0; i < $scope.submission.length; i++) {
					if ($scope.submission[i].QuestionID == elementDataArr[1]) { // ef finnur, uppfæra
						if (elementDataArr[0] === "single") {
							$scope.submission[i].Value = elementDataArr[2];
							return;
						}
						else {
							var newValue = "";
							angular.element("#question" + elementDataArr[1] + " :checked").each(function() {
								newValue = newValue + this.value + ", ";
							});
							if (newValue !== "") {
								newValue = newValue.substr(0, newValue.length-2);
								$scope.submission[i].Value = newValue;
							}
							else {
								$scope.submission.splice(i, 1);
							}
							return;
						}
					}
				}
				createEntry();
			}
		}

		createEntry = function() {
			var entry = {
				QuestionID: elementDataArr[1],
				TeacherSSN: "",
				Value: elementDataArr[2]
			};
			$scope.submission.push(entry);
		}

		$scope.submitEvaluation = function() {
			var submitResult = ApiFactory.sendSingleStudentEvaluation(evaluationParameters, $scope.submission);
			submitResult.then(function(data) {
				// MOVE USER
			}, function() {
				console.log("error");
			});
		}
		
		$scope.moveToStudentIndex = function() {
			$location.path("/student/");
		}

		var fetchResult = ApiFactory.fetchSingleStudentEvaluation(evaluationParameters);
		fetchResult.then(function(data) {
			$scope.evaluation = data;
		}, function(status) {
			console.log("error: " + status);
		});

	}
]);

/*
/api/v1/courses/:courseID/:semesterID/evaluations/:evalID ­ GET
Returns a given evaluation. The object contains the following properties:
○ ID
○ CourseQuestions ­ a list of questions directed towards the course in general.
Could be an empty array, if no such questions should be asked.
○ TeacherQuestions ­ a list of questions which should be directed towards the
teachers in the course. Note that the student doesn't have to evaluate all
teachers, only those (s)he has interacted with.

CourseQuestions: Array[1]
ID: 13
IntoTextIS: "intro isl"
IntroTextEN: "intro"
TeacherQuestions: Array[1]
TemplateID: 40
TitleEN: "Rate this"
TitleIS: "asdf"


/api/v1/courses/:courseID/:semesterID/evaluations/:evalID ­ POST
Saves an evaluation from a student. The request should contain an array of the answers
from the student, where each item in the array contains the following properties:
○ QuestionID
○ TeacherSSN ­ empty if not applicable
○ Value ­ a text, can be a string or the ID of the option(s) selected by the student
(i.e. a comma­separated list of ID's if it is possible to choose multiple answers)
*/