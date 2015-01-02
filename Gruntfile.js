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
      "js/objects/resources.js",
      "js/objects/resources/en-us.js",
    ],
    dependencies: [
      "deps/jquery-1.7.2.min.js"
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
      },
      buildWithDeps: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %>, created by: <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>, includes JQuery 1.7.2 dependency */\n'
        },
        files: {
          'dist/<%= pkg.main %>-deps.min.js': ['<%= files.dependencies %>','<%= files.base %>']
        }
      }
    },
    qunit: {
      all: ['<%= files.tests %>']
    },
    copy: {
      examples: {
        expand: true,
        cwd: 'dist/',
        flatten: true,
        src: '<%= pkg.main %>-deps.*', 
        dest: 'examples/js/',
        filter: 'isFile'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // This plugin provides the "qunit" task.
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean','uglify','qunit','copy']);

};