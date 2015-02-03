module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    files: {
      js: [
        "js/todoTxt.js",
        "js/objects/utils.js",
        "js/classes/task.js",
        "js/objects/view.js",
        "js/objects/resources.js",
        "js/objects/resources/en-us.js",
        "js/wrapper.js",
      ],
      css: [
        "css/todoTxt.css",
      ],
      tests: "tests/qunit/allTests.html",
      functionalTests: ["tests/pft/tests/**/*.js"]
    },
    clean: {
      build: {
        src: ['dist/**/*','results/**/*','img/**/*'],
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
          banner: '/*! <%= pkg.name %> v<%= pkg.version %>, created by: <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
        },
        files: {
          'dist/<%= pkg.main %>.min.js': ['<%= files.js %>']
        }
      },
    },
    cssmin: {
      build: {
        files: {
          'dist/<%= pkg.main %>.min.css': ['<%= files.css %>']
        }
      },
    },
    qunit: {
      all: ['<%= files.tests %>']
    },
    pft: {
      options: {
        parallel: 3,
        // debug: true
      },
      src: ['<%= files.functionalTests %>']
    },
    jsdoc: {
      dist: {
        src: ['<%= files.js %>'],
        dest: 'dist/doc'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // This plugin provides the "qunit" task.
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // This plugin provides the "casper" task.
  grunt.loadNpmTasks('grunt-pft');

  // This plugin provides the "qunit" task.
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['clean','qunit','uglify','cssmin','pft','jsdoc']);

  // Build only task(s).
  grunt.registerTask('build', ['clean','uglify','cssmin']);

  // document only task(s).
  grunt.registerTask('doc', ['jsdoc']);

};
