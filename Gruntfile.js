'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    copy: {
      all: {
        src: ['*.css', '*.html', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        dest: 'dist/',
      },
    },

    browserify: {
      all: {
        src: 'app.js',
        dest: 'dist/app.js'
      },
      options: {
        transform: ['debowerify']
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      },
    },

    connect: {
      options: {
        port: process.env.PORT || 3131,
        base: 'dist/',
      },

      all: {},
    },

    watch: {
      options: {
        livereload: true
      },

      html: {
        files: '<%= copy.all.src %>',
      },

      js: {
        files: '<%= browserify.all.src %>',
        tasks: ['browserify'],
      },

      assets: {
        files: ['assets/**/*', '*.css', '*.js', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
        tasks: ['copy'],
      }
    }
  });

//  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
//   grunt.loadNpmTasks('jshint');
//   grunt.loadNpmTasks('clean');
//   grunt.loadNpmTasks('browserify');
//   grunt.loadNpmTasks('copy');
//   grunt.loadNpmTasks('watch');
//   grunt.loadNpmTasks('connect');

  // grunt.registerTask('jshint');
  // grunt.registerTask('clean');
  // grunt.registerTask('browserify');
  // grunt.registerTask('copy');

  grunt.registerTask('default', ['jshint', 'clean', 'browserify', 'copy']);
  grunt.registerTask('server', ['default', 'connect', 'watch']);

};
