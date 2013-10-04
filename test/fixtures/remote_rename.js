'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'first',
                    url: 'https://github/rubenv/grunt-git.git'
                }
            },
            rename: {
                options: {
                    command: 'rename',
                    old: 'first',
                    "new": 'testing'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:rename']);
};