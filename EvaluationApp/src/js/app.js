var app = angular.module("EvaluationApp", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/login.html",
		controller: "LoginController"
	}).when("/student/", {
		templateUrl: "templates/student.html",
		controller: "StudentController"
	}).when("/student/courses/:courseID/:semesterID/evaluations/:evalID/", {
		templateUrl: "templates/doEvaluation.html",
		controller: "DoEvaluationController"
	}).when("/admin/", {
		templateUrl: "templates/admin.html",
		controller: "AdminController"
	}).when("/admin/ongoing/:evalID", {
		templateUrl: "templates/viewOngoingEvaluation.html",
		controller: "ViewOngoingEvaluationController"
	}).when("/admin/result/:evalID", {
		templateUrl: "templates/viewEvaluationResult.html",
		controller: "ViewEvaluationResultController"
	}).when("/admin/evaluations/", {
		templateUrl: "templates/evaluations.html",
		controller: "EvaluationsController"
	}).when("/admin/evaluations/viewTemplate/:templateID", {
		templateUrl: "templates/viewTemplate.html",
		controller: "ViewTemplateController"
	}).when("/admin/evaluations/createTemplate/", {
		templateUrl: "templates/createTemplate.html",
		controller: "CreateTemplateController"
	}).otherwise({ redirectTo: "/"});
});