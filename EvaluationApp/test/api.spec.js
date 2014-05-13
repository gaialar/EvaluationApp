describe("ApiFactory tests", function() {
	var $httpBackend, $http, api, template, evaluation, studentEvaluation;

	beforeEach(module("EvaluationApp"));
	beforeEach(function() {

        evaluation = {
            ID: 1,
            TemplateTitleIS: "istemp1",
            TemplateTitleEN: "entemp1",
            StartDate: "",
            EndDate: "",
            Status: "new",
            courseID: "",
            semesterID: "",
            evalID: ""
        }

        template = {
            ID: 1,
            TitleIS: "istemp1",
            TitleEN: "entemp1",
            IntroTextIS: "isIntro",
            IntroTextEN: "enIntro",
            CourseQuestions: [],
            TeacherQuestins: []
        }

        inject(function($injector) {
    		$httpBackend = $injector.get('$httpBackend');
            $http = $injector.get('$http');

            // Create a fresh instance of the ApiFactory:
            ApiFactory = $injector.get("ApiFactory");		
	   });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    })

    it("is possible to login as 'brynjarb12' and get a token with 'ninja1337'", function() {
        var url = "http://dispatch.ru.is/h20/api/v1/login";
        var data = {
            Token: "ninja1337",
            User: {
                Role: "student",
                Username: "brynjarb12"
            }
        };
        
        // Intercept HTTP requests and do the following:
        $httpBackend.when('POST', url).respond(data);

        ApiFactory.login("brynjarb12", "123456").then(function(role) {
            expect(ApiFactory.getRole()).toBe(role);
            expect(role).toBe("student");
            expect(ApiFactory.getUsername()).toBe("brynjarb12");
            expect(ApiFactory.getToken()).toBe("ninja1337");
        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it("is is possible to get error from login", function() {
        var url = "http://dispatch.ru.is/h20/api/v1/login";
        var data = {
            Token: "ninja1337",
            User: {
                Role: "student",
                Username: "brynjarb12"
            }
        };
        
        // Intercept HTTP requests and do the following:
        $httpBackend.when('POST', url).respond(401);

        ApiFactory.login("brynjarb12", "123456").then(function(role) {
            
        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is possible to send evaluation templates', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates/";
        $httpBackend.when('POST', url).respond(data);

        ApiFactory.sendEvaluationTemplate(template).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is not possible to send evaluation templates', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates/";
        $httpBackend.when('POST', url).respond(500);

        ApiFactory.sendEvaluationTemplate(template).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is possible to send evaluations', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluations/";
        $httpBackend.when('POST', url).respond(data);

        ApiFactory.sendEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is not possible to send evaluations', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluations/";
        $httpBackend.when('POST', url).respond(500);

        ApiFactory.sendEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is possible to fetch all evaluation templates', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates";
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchAllEvaluationTemplates().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch all evaluation templates', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates";
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchAllEvaluationTemplates().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is possible to fetch an evaluation template by id', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates/";
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchSingleEvaluationTemplate("").then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch an evaluation template by id', function() {
        var url = "http://dispatch.ru.is/h20/api/v1/evaluationtemplates/";
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchSingleEvaluationTemplate("").then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is possible to fetch all evaluations', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/evaluations/");
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchAllEvaluations().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch all evaluations', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/evaluations/");
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchAllEvaluations().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is possible to fetch all evaluations', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/my/evaluations");
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchAllOpenEvaluations().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch all evaluations', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/my/evaluations");
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchAllOpenEvaluations().then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is  possible to fetch an evaluation for a student', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/courses///evaluations/");
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchSingleStudentEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch an evaluation for a student', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/courses///evaluations/");
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchSingleStudentEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

        it('is  possible to send an evaluation for a student', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/courses///evaluations/");
        $httpBackend.when('POST', url).respond(data);

        ApiFactory.sendSingleStudentEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is not possible to send an evaluation for a student', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/courses///evaluations/");
        $httpBackend.when('POST', url).respond(500);

        ApiFactory.sendSingleStudentEvaluation(evaluation).then(function() {

        });
        $httpBackend.expectPOST(url);
        $httpBackend.flush();
    });

    it('is  possible to fetch an evaluation for an admin', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/evaluations/");
        $httpBackend.when('GET', url).respond(data);

        ApiFactory.fetchSingleAdminEvaluation("").then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });

    it('is not possible to fetch an evaluations for an admin', function() {
        var url = ("http://dispatch.ru.is/h20/api/v1/evaluations/");
        $httpBackend.when('GET', url).respond(500);

        ApiFactory.fetchSingleAdminEvaluation("").then(function() {

        });
        $httpBackend.expectGET(url);
        $httpBackend.flush();
    });
});