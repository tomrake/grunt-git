
'use strict';

module.exports = function (grunt) {
 
    grunt.registerMultiTask('gitremote', 'Add and Remove remote repositories', function () {
        var options = this.options();
        var args = ['remote'];
        if (options.command) {
            switch (options.command) {
            case 'add':
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['add']);
                if (options.track) {
                    if (Object.prototype.toString.call(options.track) === "[object Array]") {
                        options.track.forEach(function (item) {
                            args = args.concat(['-t', item]);
                        });
                    } else {
                        args = args.concat(['-t', options.track]);
                    }
                }
                if (options.master) {
                    args = args.concat(['-m', options.master]);
                }
                if (options.fetch) {
                    args = args.concat(['-f']);
                }
                if (options.tags) {
                    args = args.concat(['--tags']);
                }
                if (options.mirror) {
                    switch (options.mirror) {
                    case 'fetch':
                        args = args.concat(['--mirror=fetch']);
                        break;
                    case 'push':
                        args = args.concat(['--mirror=push']);
                        break;
                    default:
                        grunt.log.error('gitremote mirror=' + options.mirror +
                        ' not understood?');
                    }
                }
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote add must define a name');
                }
                if (options.url) {
                    args = args.concat([options.url]);
                } else {
                    grunt.log.error('gitremote add must define a url');
                }
                break;
            case 'remove':
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['remove']);
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote remove must define a name');
                }
                break;
            case 'rename':
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['rename']);
                if (options.old) {
                    args = args.concat([options.old]);
                } else {
                    grunt.log.error('gitremote remove must define a old name');
                }
                if (options["new"]) {
                    args = args.concat([options["new"]]);
                } else {
                    grunt.log.error('gitremote remove must define a new name');
                }
                break;
            case 'set-head':
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['set-head']);
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote set-head must define a name');
                }
                if (options.add) {
                    args = args.concat('-a');
                } else if (options["delete"]) {
                    args = args.concat('-d');
                } else if (options.branch) {
                    args = args.concat(options.branch);
                } else {
                    grunt.log.error('gitremote set-head must specify add, delete or a branch');
                    return;
                }
                break;
            case 'set-branches':
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['set-branches']);
                if (options.add) {
                    args = args.concat(['--add']);
                }
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote set-branches must define a name');
                    return;
                }
                if (options.track) {
                    if (Object.prototype.toString.call(options.track) === "[object Array]") {
                        options.track.forEach(function (item) {
                            args = args.concat([item]);
                        });
                    } else {
                        args = args.concat([options.track]);
                    }
                } else {
                    grunt.log.error('gitremote set-branches must define a list of branches to track');
                    return;
                }
                break;
            case 'set-url':
                var change = false;
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['set-url']);
                if (options.add && options.remove) {
                    grunt.log.error('gitremote set-url can not set both add and remove');
                    return;
                } else if (options.add) {
                    args = args.concat(['--add']);
                } else if (options.remove) {
                    args = args.concat(['--delete']);
                } else {
                    change = true;
                }
                if (options.push) {
                    args = args.concat(['--push']);
                }
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote set-url requires a remote name');
                    return;
                }
                var url_count = 0;
                if (options.urls) {
                    if (Object.prototype.toString.call(options.urls) === "[object Array]") {
                        options.urls.forEach(function (item) {
                            url_count ++;
                            args = args.concat([item]);
                        });
                    } else {
                        url_count ++;
                        args = args.concat([options.urls]);
                    }
                } else {
                    grunt.log.error('gitremote set-url requires a urls');
                    return;
                }
                switch (url_count) {
                case 0:
                    grunt.log.error('girremote set-url: requires one or two urls');
                    return;
                case 1:
                    break;
                case 2:
                    if (!change) {
                        grunt.log.error('gitremote set-url add or remove requies only 1 url');
                        return;
                    }
                    break;
                default:
                    grunt.log.error('gitremote set-url: to many urls specified');
                    return;
                }
                break;
            case "show":
                if (options.verbose) {
                    args = args.concat(['--verbose']);
                }
                args = args.concat(['show']);
                if (options.noQuery) {
                    args = args.concat(['-n']);
                }
                if (options.name) {
                    args = args.concat([options.name]);
                } else {
                    grunt.log.error('gitremote show required a name for the remote');
                }
                break;
            default:
                grunt.log.error('gitremote ' + options.command + ' is unknown');
                return;
            }
        }

        var done = this.async();


        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (error, result, code) {
            if (code) {
                grunt.log.errorlns('Error: ' + code);
                grunt.log.errorlns(result.stderr);
                done(new Error('Error: ' + code));
            } else {
                grunt.log.writeln(result.stdout);
                done();
            }
        });

    });


};
