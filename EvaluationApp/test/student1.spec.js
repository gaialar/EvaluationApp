describe("StudentController tests", function() {
	var $scope, $timeout, location, $rootScope, controller, mockApi, timerCallback, data;

	beforeEach(module("EvaluationApp"));
    beforeEach(function(){
            mockApi = {     
                fetchAllOpenEvaluations: function() {
                    deferred = q.defer();
                    data = "a";
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };
            //spyOn(mockApi, 'fetchAllOpenEvaluations').andCallThrough();

            module(function($provide) {
                $provide.value('ApiFactory', mockApi);
            });

            inject(function($rootScope, $injector, $controller, $q, $compile, $location) {
            $rootScope = $rootScope;//$injector.get('$rootScope');
            $scope = $rootScope.$new();
            q = $q;
            location = $location;

            controller = $controller("StudentController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
            
            //call digest on the scope.
            $scope.$digest();
        });
    });

	it('should work for evaluations', inject(function($rootScope, $q){
    }));

});