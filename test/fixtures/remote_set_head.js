'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    fetch: true,
                    name: 'testing',
                    url: 'https://github.com/rubenv/gitclone-test.git'
                }
            },
            sethead: {
                options: {
                    command: 'set-head',
                    name: 'testing',
                    branch: 'test'
                }
            }
            
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:sethead']);
};