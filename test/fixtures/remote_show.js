'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'testing',
                    url: 'https://github.com/rubenv/grunt-git.git'
                }
            },
            show: {
                options: {
                    command: 'show',
                    name: 'testing'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:show']);
};