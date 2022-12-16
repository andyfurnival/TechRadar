module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                beautify: true,
                mangle: {
                    properties: true,
                    toplevel: true, // <-- Add this
                    eval: true  // <-- Add this
                }
            },
            build: {
                src: 'src/server.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['**/views/**'], dest: 'build/', cwd: 'src'},
                    {expand: true, src: ['ProcFile'], dest: 'build/'},
                    {expand: true, src: ['**/*.js'], dest: 'build/', cwd: 'src'},
                    {expand: true, src: ['**/*.css'], dest: 'build/', cwd: 'src'},
                    {expand: true, src: ['**/*.png'], dest: 'build/', cwd: 'src'},
                    {expand: true, src: ['package.json'], dest: 'build/'},
                    {expand: true, src: ['.npmrc'], dest: 'build/'},
                ],
            },
        },
        compress: {
            main: {
                options: {
                    archive: 'techradar.zip'
                },
                expand: true,
                src: '**',
                cwd: 'build/',
                dest: '/',
                dot: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy', 'compress']);


};