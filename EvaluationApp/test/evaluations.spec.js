describe("EvaluationsController tests", function() {
	var $scope, $timeout, location, $rootScope, controller, mockApi, mockApi1, timerCallback, data;

	beforeEach(module("EvaluationApp"));
    beforeEach(function(){
            
            mockApi = {     
                fetchAllEvaluationTemplates: function() {
                    deferred = q.defer();
                    data = "";
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            //spyOn(mockApi, 'fetchAllEvaluationTemplates').andCallThrough();

            module(function($provide) {
                $provide.value('ApiFactory', mockApi);
            });

            inject(function($rootScope, $injector, $controller, $q, $compile, $location) {
            $rootScope = $rootScope;//$injector.get('$rootScope');
            $scope = $rootScope.$new();
            q = $q;
            location = $location;

            controller = $controller("EvaluationsController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
            
            //call digest on the scope.
            $scope.$digest();
        });
    });

    it('should be possible to go to create template index', function() {
        $scope.moveToCreateTemplateIndex();
    });

    it('should be possible to go back to admin main page', function() {
        $scope.moveToAdminIndex();
    });

    it('should work for evaluations', inject(function($rootScope, $q){
        data = "aaa";
    }));

});