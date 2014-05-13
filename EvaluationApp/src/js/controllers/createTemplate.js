app.controller("CreateTemplateController", [
	"$scope", "$timeout", "$location", "ApiFactory", "$anchorScroll",
	function($scope, $timeout, $location, ApiFactory, $anchorScroll) {

		$scope.courseQuestions = [];
		$scope.teacherQuestions = [];
		$scope.creatingQuestion = false;
		$scope.currentQuestionType = "";

		$scope.templateTitleIS = "";
		$scope.templateTitleEN = "";
		$scope.templateIntroIS = "";
		$scope.templateIntroEN = "";
		$scope.textIS = "";
		$scope.textEN = "";
		$scope.answers = [
			{ ID: 1, TextIS: "", TextEN: "", Weight: ""},
			{ ID: 2, TextIS: "", TextEN: "", Weight: ""}
		];
		$scope.answersSize = 2;

		$scope.templateMessage = "";
		$scope.showTemplateMessage = false;
		$scope.questionMessage = "";
		$scope.showQuestionMessage = false;

		var currentCourseQuestionID = 1;
		var currentTeacherQuestionID = 1;
		var currentAnswerID = 3;
		var currentQuestionSelection = "course";

		$scope.clickQuestion = function(obj) {
			$scope.creatingQuestion = true;
			$scope.currentQuestionType = obj.target.attributes.data.value;

			$scope.clearTemplateMessage();

			$timeout(function(){
	    		window.scrollTo(0,document.body.scrollHeight);
			},	50);
			
		}

		$scope.saveQuestion = function() {
			if (questionValidationFailure() === true) {}
			else {
				var question = createQuestion();
				addQuestion(question);
			}
		}

		$scope.createAnswer = function(){
			$scope.answers.push( { ID: currentAnswerID, TextIS: "", TextEN: "", Weight: "" } );
			currentAnswerID++;
			$scope.answersSize++;
		}

		$scope.deleteAnswer = function(){
			$scope.answers.pop();
			currentAnswerID--;
			$scope.answersSize--;
		}

		$scope.selectQuestionCategory = function(obj) {
			if(currentQuestionSelection !== obj.target.attributes.data.value){
				currentQuestionSelection = obj.target.attributes.data.value;
				angular.element("#courseButton").toggleClass("selectedButton");
				angular.element("#teacherButton").toggleClass("selectedButton");
			}
		}

		$scope.saveTemplate = function() {
			if (templateValidationFailure() === true) {}
			else {
				var template = createTemplate();
				var sendResult = ApiFactory.sendEvaluationTemplate(template);
				sendResult.then(function() {
					$location.path("/admin/evaluations/");
				});
			}
		}

		$scope.moveToEvaluationsIndex = function() {
			$location.path("/admin/evaluations/");
		}

		$scope.clearTemplateMessage = function() {
			$scope.templateMessage = "";
			$scope.showTemplateMessage = false;
		}

		$scope.clearQuestionMessage = function() {
			$scope.questionMessage = "";
			$scope.showQuestionMessage = false;
		}

		createQuestion = function() {
			var questionID = 0;
			if (currentQuestionSelection === "course") {
				questionID = currentCourseQuestionID;
			}
			else {
				questionID = currentTeacherQuestionID;
			}

			if ($scope.currentQuestionType === "text") {
				var rtn = {
					ID: questionID,
					TextIS: $scope.textIS,
					TextEN: $scope.textEN,
					ImageURL: "",
					Type: $scope.currentQuestionType,
				}
			}
			else {
				var rtn = {
					ID: questionID,
					TextIS: $scope.textIS,
					TextEN: $scope.textEN,
					ImageURL: "",
					Type: $scope.currentQuestionType,
					Answers: $scope.answers
				}
			}

			$scope.clearTemplateMessage();
			return rtn;
		}

		createTemplate = function() {
			return {
				TitleIS: $scope.templateTitleIS,
				TitleEN: $scope.templateTitleEN,
				IntroTextIS: $scope.templateIntroIS,
				IntroTextEN: $scope.templateIntroEN,
				CourseQuestions: $scope.courseQuestions,
				TeacherQuestions: $scope.teacherQuestions
			};
		}

		addQuestion = function(question) {
			if (currentQuestionSelection === "course") {
				$scope.courseQuestions.push(question);
				currentCourseQuestionID++;
			}
			else {
				$scope.teacherQuestions.push(question);
				currentTeacherQuestionID++;
			}
			resetQuestionFields();
		}

		resetQuestionFields = function() {
			$scope.creatingQuestion = false;
			$scope.currentQuestionType = "";
			$scope.textIS = "";
			$scope.textEN = "";
			$scope.answers = [
				{ ID: 1, TextIS: "", TextEN: "", Weight: "" },
				{ ID: 2, TextIS: "", TextEN: "", Weight: "" }
			];
			$scope.answersSize = 2;

			if(!angular.element("#courseButton").hasClass("selectedButton")) {
				angular.element("#courseButton").toggleClass("selectedButton");
				angular.element("#teacherButton").toggleClass("selectedButton");
				currentQuestionSelection = "course";
			}
		}

		questionValidationFailure = function(question) {
			var rtn = false;
			if ($scope.textEN === "") {
				rtn = true;
				$scope.questionMessage = "English version of question is missing";
				$scope.showQuestionMessage = true;
			}
			if ($scope.textIS === "") {
				rtn = true;
				$scope.questionMessage = "Icelandic version of question is missing";
				$scope.showQuestionMessage = true;
			}

			if ($scope.currentQuestionType === "single" ||  $scope.currentQuestionType === "multiple") {
				var pattern = /^[1-5]{1}$/;
				for (var answer in $scope.answers) {
					if ($scope.answers[answer].TextIS === "") {
						rtn = true;
						$scope.questionMessage = "Icelandic version of answer is missing";
						$scope.showQuestionMessage = true;
					}
					else {rtn = false;}
					if ($scope.answers[answer].TextEN === "") {
						rtn = true;
						$scope.questionMessage = "English version of answer is missing";
						$scope.showQuestionMessage = true;
					}
					else {rtn = false;}
					if ($scope.answers[answer].Weight === "") {
						rtn = true;
						$scope.questionMessage = "Question weight is missing";
						$scope.showQuestionMessage = true;
					}
					else {rtn = false;}
					if (pattern.test($scope.answers[answer].Weight) === false) {
						rtn = true;
						$scope.questionMessage = "Question weight must fall in the range of 1 to 5";
						$scope.showQuestionMessage = true;
					}
					else {rtn = false;}
				}
			}

			return rtn;
		}

		templateValidationFailure = function() {
			var rtn = false;
			if ($scope.templateTitleEN === "") {
				rtn = true;
				$scope.templateMessage = "Each of the above fields needs to be filled out in order to save the template";
				$scope.showTemplateMessage = true;
			}
			else {}
			if ($scope.templateTitleIS === "") {
				rtn = true;
				$scope.templateMessage = "Each of the above fields needs to be filled out in order to save the template";
				$scope.showTemplateMessage = true;
			}
			else {}
			if ($scope.templateIntroEN === "") {
				rtn = true;
				$scope.templateMessage = "Each of the above fields needs to be filled out in order to save the template";
				$scope.showTemplateMessage = true;
			}
			else {}
			if ($scope.templateIntroIS === "") {
				rtn = true;
				$scope.templateMessage = "Each of the above fields needs to be filled out in order to save the template";
				$scope.showTemplateMessage = true;
			}
			else {}
			if ($scope.teacherQuestions.length === 0 && $scope.courseQuestions.length === 0) {
				if (rtn === false) {
					rtn = true;
					$scope.templateMessage = "The template needs to contain at least one question in order to be able to save it";
					$scope.showTemplateMessage = true;
				}
			}
			else {}
			return rtn;
		}

	}
]);