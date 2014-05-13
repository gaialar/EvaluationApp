describe("AdminController tests", function() {
    var $scope, $timeout, location, $rootScope;
    var controller, mockApi, timerCallback, q, evaluations, evaluation, start, end;

    beforeEach(module("EvaluationApp"));

    beforeEach(function(){
        mockApi = {     
            fetchAllEvaluations: function() {
                deferred = q.defer();
                data = "";
                deferred.resolve(data);
                return deferred.promise;
            },

            setStartDate: function(_start) {
               start = _start;
            },

            setEndDate: function(_end) {
                end = _end;
            }, 
        };
        
        module(function($provide) {
            $provide.value('ApiFactory', mockApi);
        });

        evaluations = [
            evaluation = {
                ID: 1,
                TemplateTitleIS: "istemp1",
                TemplateTitleEN: "entemp1",
                StartDate: "",
                EndDate: "",
                Status: "new"
            }, 
            evaluation = {
                ID: 2,
                TemplateTitleIS: "istemp1",
                TemplateTitleEN: "entemp1",
                StartDate: "",
                EndDate: "",
                Status: "open"
            }, 
            evaluation = {
                ID: 3,
                TemplateTitleIS: "istemp1",
                TemplateTitleEN: "entemp1",
                StartDate: "",
                EndDate: "",
                Status: "closed"
            }
        ];

        inject(function($injector, $controller, $location, $q) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            q = $q
            location = $location;

            controller = $controller("AdminController", {
                "$scope": $scope,
                api: mockApi
            });
            $scope.$digest();
        });
    });

    it('should be possible to check for new evaluations and find some', function() {
        for (var evaluation in $scope.evaluations) {
            //$scope.evaluations[evaluation].Status === "new"
        }
        checkForNewEvaluations();
    });

    it('should be possible to go set dates', function() {
        spyOn(mockApi, 'setStartDate').andCallThrough();
        spyOn(mockApi, 'setEndDate').andCallThrough();
        
        start = "1997-07-16T19:20+01:00";
        end = "2015-07-16T19:20+01:00";

        $scope.setDates(start, end);
        expect(mockApi.setStartDate).toHaveBeenCalledWith(start);
        expect(mockApi.setEndDate).toHaveBeenCalledWith(end);
    });

    it('should be possible to go to evaluations', function() {
        $scope.moveToEvaluationsIndex();
    });
}); 