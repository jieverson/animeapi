module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['gruntfile.js', '*.js', 'lib/**/*.js', 'test/**/*.js', 'crawlers/**/*.js']
    },
    nodeunit: {
      files: ['tests/*_test.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'nodeunit']);
};