BEFORE YOU START:
1) Node.js, grunt and bower should already be installed on your system.
2) npm install
3) bower install

RUN THIS SEQUENCE TO SEE PROJECT:
to run tests: karma start
to run client: python -m SimpleHTTPServer 8080
to run project: grunt

IF ON LINUX, WITH CHROMIUM:
export CHROME_BIN=/usr/bin/chromium-browser

IMPLEMENTED IN PROJECT:

Funcional requirements:
	User can log in.
	Admin can create evaluation templates with all types of questions.
	Admin can create an evaluation from template with start and end dates.
	Student can answer course questions, not teacher questions.
	Admin can see how many students have anwered each choice for a question and all text answers for a questin.


Technical requirements:
	Over 80% code coverage with Karma/jasmine.
	No directive included.
	Uses HTML%/AngularJS validation for input fields, except for inputs that we validate more thoroughly ourselves.
	App is responsive and easy to use with touchscreen.
	Less and SUIT used for css.
