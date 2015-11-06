module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {

                    importPath: 'bower_components/foundation/scss',
                    sassDir: 'src/scss',
                    cssDir: 'site/css',
                    outputStyle: 'compressed',
                },
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['bower_components/foundation/js/foundation/*'],
                        flatten: true,
                        dest: 'site/lib/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        src: ['bower_components/foundation/js/vendor/*'],
                        flatten: true,
                        dest: 'site/lib/',
                        filter: 'isFile'
                    },
                ],
            },
        },

        bake: {
            your_target: {
                options: {
                    // Task-specific options go here.
                },

                files: {
                    // files go here, like so:

                    "site/index.html": "src/html/index.html",

                    // etc ...
                },
            },
        },

        watch: {
            bake: {
                files: ["src/include/**", "src/html/**"],
                tasks: "bake",
                options: {
                    livereload: true
                }
            },
            sass: {
                files: 'src/scss/**/*.scss',
                tasks: "compass",
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'site'
                }
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-bake");
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('server', ['build', 'connect:server', 'watch']);
    grunt.registerTask('build', ['copy', 'bake', 'compass']);
    grunt.registerTask('default', ['build', 'watch']);
};
