describe("ViewTemplateController tests", function() {
	var $scope, $timeout, location, $rootScope;
    var controller, mockApi;

	beforeEach(module("EvaluationApp"));
    beforeEach(function(){
        mockApi = {     
            fetchSingleEvaluationTemplate: function() {
                deferred = q.defer();
                data = 1;
                deferred.resolve(data);
                return deferred.promise;
            },
            sendEvaluation: function(evaluation) {
                deferred = q.defer();
                data = 1;
                deferred.resolve(data);
                return deferred.promise;
            }
        };
        //spyOn(mockApi, 'login').andCallThrough();

        module(function($provide) {
            $provide.value('ApiFactory', mockApi);
        });

        inject(function($injector, $controller, $location, $routeParams, $compile) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            location = $location;
            $routeParams.templateID = 1;

            controller = $controller("ViewTemplateController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });

            $scope.$digest();
        });
    });

	it('should be possible to move to EvaluationIndex', function() {
		$scope.moveToEvaluationIndex();
    });

    it('should be possible to use a template', function() {
        $scope.useTemplate();
    });

    it('should be possible to cancel a template', function() {
        $scope.cancelUseTemplate();
    });

    it('should be possible to create an evaluation', function() {
        createEvaluation();
    });
}); 