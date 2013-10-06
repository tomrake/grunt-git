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
            seturladd: {
                options: {
                    command: 'set-url',
                    name: 'testing',
                    add: true,
                    urls: ['https://github.com/tomrake/grunt-git.git']
                }
            },
            seturlremove: {
                options: {
                    command: 'set-url',
                    name: 'testing',
                    remove: true,
                    urls: ['https://github.com/rubenv/grunt-git.git']
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:seturladd', 'gitremote:seturlremove']);
};