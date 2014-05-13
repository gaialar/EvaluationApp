module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      hint: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/controllers/*.js",
        ],
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/controllers/*.js",
        ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    less: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: [
          "src/less/index.less",
        ],
        dest: 'build/<%= pkg.name %>.min.css'
      }
    },
    watch: {
      files: [
          "src/less/*.less",
        ],
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks:
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('run-ugly', ['uglify']);
  grunt.registerTask('run-hint', ['jshint']);
  grunt.registerTask('compile-less', ['less']);
};