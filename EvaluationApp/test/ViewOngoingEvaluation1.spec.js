describe("ViewOngoingEvaluationController tests", function() {
	var $scope, $timeout, location, $rootScope, controller, mockApi, timerCallback, data;

	beforeEach(module("EvaluationApp"));
    beforeEach(function(){
            mockApi = {     
                fetchAllOpenEvaluations: function() {
                    deferred = q.defer();
                    data = "";
                    deferred.resolve(data);
                    return deferred.promise;
                },

                getStartDate: function() {
                    return "1997-07-16T19:20+01:00";
                },

                getEndDate: function() {
                    return "2015-07-16T19:20+01:00";
                }, 

                fetchSingleAdminEvaluation: function() {
                    deferred = q.defer();
                    data = "a";
                    deferred.resolve(data);
                    return deferred.promise;
                },

                fetchSingleEvaluationTemplate: function() {
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

            controller = $controller("ViewOngoingEvaluationController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
            
            //call digest on the scope.
            $scope.$digest();
        });
    });

	it('should work for ViewOngoingEvaluationController', inject(function($rootScope, $q){
        
    }));

});