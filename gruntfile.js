module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['*.js', 'lib/**/*.js', 'tests/**/*.js', 'crawlers/**/*.js']
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