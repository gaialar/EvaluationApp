describe("CreateTemplateController", function() {
	var $scope, $timeout, location, $rootScope, controller, mockApi, timerCallback, q;

	
    
    beforeEach(module("EvaluationApp"));
    beforeEach(function(){
        mockApi = {     
            sendEvaluationTemplate: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
        //spyOn(mockApi, 'sendEvaluationTemplate').andCallThrough();

        module(function($provide) {
            $provide.value('ApiFactory', mockApi);
        });

        inject(function($injector, $controller, $location, $q) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            q = $q;
            location = $location;
            $timeout = $injector.get('$timeout');

            setTimeout(function() {
                a = 1;
            }, 50);

            obj = {
                target: {
                    attributes: {
                        data: {
                            value: "teacher"
                        }
                    }
                }
            };

            controller = $controller("CreateTemplateController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
             $scope.$digest();
        });
    });
    
    it('should get evaluation template', inject(function($rootScope, $q){
        spyOn(mockApi, 'sendEvaluationTemplate').andCallThrough();
        $scope.templateTitleIS = "is";
        $scope.templateTitleEN = "en";
        $scope.templateIntroIS = "icelandic text";
        $scope.templateIntroEN = "english text";
        $scope.teacherQuestions.length = 1;
        $scope.courseQuestions.length = 2;
        $scope.currentQuestionType === "single";
        $scope.saveTemplate();
        deferred.resolve();
        expect(mockApi.sendEvaluationTemplate).toHaveBeenCalled();
        $rootScope.$apply();
        expect(location.path()).toBe("/admin/evaluations/");
    }));

    it('should make saveQuestion() call checkForEmptyField() and get true back', function() {
        $scope.saveQuestion();
    });
   
    it('should be possible to create an answer', function() {
        $scope.createAnswer();
    });

    it('should be possible to delete an answer', function() {
        $scope.deleteAnswer();
    });

    it('should set currentQuestionType as "text"', function() {
        $scope.currentQuestionType = "text";
    });

    it('should be possible to select a new question', function() {
        $scope.clickQuestion(obj);
        expect($scope.creatingQuestion).toBe(true);
        expect($scope.currentQuestionType).toBe(obj.target.attributes.data.value);
        
    });

    it('should be possible to clear question message', function() {
        var questSel = "course";
        addQuestion(questSel);
    });

    it('should be possible to add a course question', function() {
        $scope.clearQuestionMessage();
    });

    it('should be possible to add a teacher question', function() {
        
        var questSel = {
                    ID: 1,
                    TextIS: $scope.textIS,
                    TextEN: $scope.textEN,
                    ImageURL: "",
                    Type: "teacher",
                    Answers: $scope.answers
        }
        currentQuestionSelection = "questSel.Type";
        addQuestion(questSel);
    });
 
    it('should be possible to select question category', function() {
        $scope.selectQuestionCategory(obj);
    });

    it('should not be possible to select question category', function() {
        currentQuestionSelection = "";
        $scope.selectQuestionCategory(obj);
    });

    it('should be possible to save a template that does not validate', function() {
        $scope.saveTemplate();
    });

    it('should be possible to save a template that validates', function() {
        $scope.templateTitleIS = "is";
        $scope.templateTitleEN = "en";
        $scope.templateIntroIS = "icelandic text";
        $scope.templateIntroEN = "english text";
        $scope.teacherQuestions.length = 1;
        $scope.courseQuestions.length = 2;
        $scope.currentQuestionType === "single";

        $scope.saveTemplate();
    });

    it('should be possible to create text question', function() {
        $scope.currentQuestionType = "text";
        createQuestion();
    });

    it('should be possible to create template', function() {
        createTemplate();
    });

    it('should be possible to move to evaluations index', function() {
        $scope.moveToEvaluationsIndex();
    });

    it('should validate patterns for single or mult questions and return true', function() {
        $scope.currentQuestionType = "single";
        $scope.textEN = "en";
        $scope.textIS = "is";

        questionValidationFailure();
    });
    it('should validate patterns for single or mult questions and get return false', function() {
        for (var answer in $scope.answers) {
            $scope.currentQuestionType = "single";
            $scope.textEN = "en";
            $scope.textIS = "is";
            $scope.answers[answer].TextIS = "ice answer";
            $scope.answers[answer].TextEN = "en answer";
            $scope.answers[answer].Weight = "1";
        }

        questionValidationFailure();
        $scope.saveQuestion();
    });
    it('should validate patterns for teacherQuestions', function() {
        for (var answer in $scope.answers) {
            $scope.currentQuestionType = "single";
            $scope.textEN = "en";
            $scope.textIS = "is";
            $scope.answers[answer].TextIS = "ice answer";
            $scope.answers[answer].TextEN = "en answer";
            $scope.answers[answer].Weight = "1";

        }
        rtn = false;
        questionValidationFailure();
        $scope.saveQuestion();
    });
});