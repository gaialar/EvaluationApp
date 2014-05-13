describe("LoginController tests", function() {
    var $scope, $timeout, location, $rootScope, controller, mockApi, q, errmessage;
    var form, elem, compiled, deferred, promise, Token, Role, studentData, adminData;

    beforeEach(module("EvaluationApp"));
    beforeEach(function(){
            mockApi = {     
                login: function() {
                    deferred = q.defer();
                    return deferred.promise;
                }
            };
           
            module(function($provide) {
                $provide.value('ApiFactory', mockApi);
            });

            inject(function($rootScope, $injector, $controller, $q, $compile, $location) {
            $rootScope = $rootScope;//$injector.get('$rootScope');
            $scope = $rootScope.$new();
            q = $q;
            location = $location;
            $timeout = $injector.get('$timeout');
            elem = angular.element( 
                '<form name="loginForm" class="Login" novalidate>' +
                    '<input type="text"' +
                            'ng-model="username"/>' +
                    '<input type="password"' +
                            'ng-model="password"' +
                            'required />' +
                '</form>'  
            );

            studentData = {
                role: "student"
            };

            controller = $controller("LoginController", {
                "$scope": $scope,
                api: mockApi,
                $location: location
            });
            
            //run the compiled view.
            compiled = $compile(elem)($scope);

            //call digest on the scope.
            $scope.$digest();
            form = $scope.loginForm;
        });
    });

    it('should reset (clear) the login object', function() {
        $scope.login.failure = true;
        $scope.login.message = "ninja!";
        $scope.clearMessage();
        expect($scope.login.failure).toBe(false);
        expect($scope.login.message).toBe("");
    });

    
    it('should be formValidated', function() {
        $scope.username = "brynjarb12";
        $scope.password = "123456";
        $scope.$apply();
        $scope.login();
        expect($scope.loginForm.$valid).toBe(true);
    });

     it('should not be formValidated', function() {
        $scope.username = "adf";
        $scope.password = undefined;
        $scope.$apply();
        $scope.login();
        expect($scope.loginForm.$valid).toBe(false);
    });

    it('should be possible to log in as a student', inject(function($rootScope, $q){
        spyOn(mockApi, 'login').andCallThrough();
        $scope.username = "brynjarb12";
        $scope.password = "123456";
        $scope.login();
        deferred.resolve("student");
        expect(mockApi.login).toHaveBeenCalledWith("brynjarb12", "123456");
        $rootScope.$apply();
        expect(location.path()).toBe("/student/");
    }));

    it('should be possible to log in as an admin', inject(function($rootScope, $q){
        spyOn(mockApi, 'login').andCallThrough();
        $scope.username = "brynjarb12";
        $scope.password = "123456";
        $scope.login();
        deferred.resolve("admin");
        expect(mockApi.login).toHaveBeenCalledWith("brynjarb12", "123456");
        $rootScope.$apply();
        expect(location.path()).toBe("/admin/");
    }));

    it('should catch connection errors', inject(function($rootScope, $q){
        spyOn(mockApi, 'login').andCallThrough();
        $scope.username = undefined;
        $scope.password = "123456";
        $scope.login();
        deferred.resolve(401);
        expect(mockApi.login).toHaveBeenCalledWith(undefined, "123456");
        $rootScope.$apply();
        expect(location.path()).not.toBe("/admin/");
    }));

    it('should not be possible to log in without a username and password', function() {
        $scope.username = undefined;
        $scope.password = undefined;
        $scope.$apply();
        $scope.errMessages();
        expect($scope.login.message).toBe("Please enter your username and password.");
    });

    it('should not be possible to log in without a username', function() {
        $scope.username = undefined;
        $scope.password = "123456"
        $scope.$apply();
        $scope.errMessages();
        expect($scope.login.message).toBe("No username entered. Please enter both your username and password.");
    });

    it('should not be possible to log in without a password', function() {
        $scope.username = "brynjarb12";
        $scope.password = undefined;
        $scope.$apply();
        $scope.errMessages();
        expect($scope.login.message).toBe("Please input your password.");
    });

    it('should not be possible to log in without a password', function() {
        $scope.username = "brynjarb12";
        $scope.password = "123456";
        $scope.$apply();
        $scope.errMessages();
        expect($scope.login.message).toBe("Unknown error, please try agian.");
    });
}); 