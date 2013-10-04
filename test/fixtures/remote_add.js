'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'testing',
                    tracking: ['master', 'debug'],
                    url: 'https://github/rubenv/grunt-git.git'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote']);
};