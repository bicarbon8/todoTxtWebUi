module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    files: {
      base: [
      "js/polyfills.js",
      "js/todoTxt.js",
      "js/objects/utils.js",
      "js/classes/task.js",
    ],
    tests: "tests/allTests.html"
  },
    clean: {
      build: {
        src: ['dist/**/*'],
        filter: 'isFile',
      },
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: true,
      },
      build: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %>, created by: <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
        },
        files: {
          'dist/<%= pkg.main %>.min.js': ['<%= files.base %>']
        }
      }
    },
    qunit: {
      all: ['<%= files.tests %>']
    },
    jsdoc: {
      dist: {
        src: ['<%= files.base %>'],
        dest: 'dist/doc'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // This plugin provides the "qunit" task.
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // This plugin provides the "qunit" task.
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['clean','qunit','uglify','jsdoc']);

  // Build only task(s).
  grunt.registerTask('build', ['clean','uglify']);

  // test only task(s).
  grunt.registerTask('test', ['qunit']);

  // document only task(s).
  grunt.registerTask('doc', ['jsdoc']);

};