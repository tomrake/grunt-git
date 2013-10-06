'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'testing',
                    fetch: true,
                    tracking: ['master', 'test'],
                    url: 'https://github.com/rubenv/gitclone-test.git'
                }
            },
            seturladd: {
                options: {
                    command: 'set-url',
                    name: 'testing',
                    push: true,
                    add: true,
                    urls: ['https://github.com/tomrake/gitclone-test.git']
                }
            },
            seturlremove: {
                options: {
                    command: 'set-url',
                    name: 'testing',
                    push: true,
                    remove: true,
                    urls: ['https://github.com/tomrake/gitclone-test.git']
                }
            }
        }
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:seturladd', 'gitremote:seturlremove']);
};