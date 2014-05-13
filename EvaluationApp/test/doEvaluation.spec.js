describe("DoEvaluationController tests", function() {
	var $scope, $timeout, location, $rootScope;
    var controller, mockApi, timerCallback, obj, subm, evalPar;

	beforeEach(module("EvaluationApp"));
    beforeEach(function(){
        //subm = $scope.submission;
        //evalPar = evaluationParameters;

        mockApi = {     
            fetchSingleStudentEvaluation: function() {
                deferred = q.defer();
                data = "";
                deferred.resolve(data);
                return deferred.promise;
            },
            sendSingleStudentEvaluation: function(evalPar, subm) {
                deferred = q.defer();
                data = "";
                deferred.resolve(data);
                return deferred.promise;
            }
        };
        
        module(function($provide) {
            $provide.value('ApiFactory', mockApi);
        });
        inject(function($injector, $controller, $location) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            location = $location;

            controller = $controller("DoEvaluationController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
             //$scope.$digest();
        });
    });
    
    it('should be possible to update submission text', function() {
        obj = {
            target: {
                attributes: {
                    data: {
                        value: ""
                    }
                }
            }
        };
        $scope.updateSubmissionText(obj);
    });

    it('should be possible to update submission for no value', function() {
        obj = {
            target: {
                attributes: {
                    data: {
                        value: ""
                    }
                }
            }
        };
        $scope.updateSubmissionSingleOrMutiplie(obj);
    });

    it('should be possible to update submission for single', function() {
        obj = {
            target: {
                attributes: {
                    data: {
                        value: "single"
                    }
                }
            }
        };
        $scope.submission = ["a"];
        $scope.updateSubmissionSingleOrMutiplie(obj);
    }); 

    it('should be possible to update submission for multiple', function() {
        obj = {
            target: {
                attributes: {
                    data: {
                        value: "multiple"
                    }
                }
            }
        };
        $scope.submission = ["a"];
        newValue = "a";
        $scope.updateSubmissionSingleOrMutiplie(obj);
    });

    it('should be possible to update submission', function() {
        obj = {
            target: {
                attributes: {
                    data: {
                        value: "text"
                    }
                }
            }
        };
        $scope.submission = ["a"];
        newValue = "a";
        $scope.updateSubmissionSingleOrMutiplie(obj);
    });          

    it('should be possible to submit evaluation', function() {
        $scope.submitEvaluation();
    });

	it('should be possible to move to student index', function() {
		$scope.moveToStudentIndex();
    });
});