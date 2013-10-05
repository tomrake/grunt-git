'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    fetch: true,
                    name: 'testing',
                    track: ['master'],
                    url: 'https://github.com/rubenv/gitclone-test.git'
                }
            },
            setbranches: {
                options: {
                    command: 'set-branches',
                    add: true,
                    name: 'testing',
                    track: ['test']
                }
            }
            
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:setbranches']);
};