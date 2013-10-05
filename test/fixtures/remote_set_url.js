'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'testing',
                    tracking: ['master', 'debug'],
                    url: 'https://github.com/rubenv/grunt-git.git'
                }
            },
            seturl: {
                options: {
                    command: 'set-url',
                    name: 'testing',
                    "new": 'https://github.com/tomrake/grunt-git.git',
                    old: 'https://github.com/rubenv/grunt-git.git'
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:seturl']);
};