'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitremote: {
            add: {
                options: {
                    command: 'add',
                    name: 'testing',
                    url: 'https://github/rubenv/grunt-git.git'
                }
            },
            remove: {
                options: {
                    command: 'remove',
                    name: 'testing'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitremote:add', 'gitremote:remove']);
};