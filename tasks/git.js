/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('git', 'Execute git commands.', function () {
        grunt.log.error('The git task is deprecated, use gitcommit instead');
    });

    grunt.registerMultiTask('gitcommit', 'Commit a git repository.', function () {
        var options = this.options({
            message: 'Commit',
            ignoreEmpty: false
        });

        var done = this.async();

        var addFile = function (file, cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["add", file.src]
            }, cb);
        };

        var checkStaged = function (cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["diff", "--cached", "--exit-code"]
            }, function (err, result, code) {
                cb(code);
            });
        };

        var commit = function (cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["commit", "-m", options.message]
            }, function (err) {
                cb(!err);
            });
        };

        grunt.util.async.forEach(this.files, addFile, function (err) {
            checkStaged(function (staged) {
                if (!options.ignoreEmpty || staged) {
                    commit(done);
                } else {
                    done();
                }
            });
        });
    });

    grunt.registerMultiTask('gittag', 'Create a git tag.', function () {
        var options = this.options({
            message: ''
        });

        if (!options.tag) {
            grunt.log.error('gittag requires a tag parameter.');
            return;
        }

        var done = this.async();

        var args = ["tag"];
        if (options.message && options.message.trim() !== '') {
            args.push("-m");
            args.push(options.message);
        }
        args.push(options.tag);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitcheckout', 'Checkout a git branch.', function () {
        var options = this.options({
        });

        if (!options.branch) {
            grunt.log.error('gitcheckout requires a branch parameter.');
            return;
        }

        var done = this.async();

        var args = ["checkout"];
        if (options.create) {
            args.push("-b");
        }
        args.push(options.branch);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitstash', 'Stash and apply code changes', function () {
        var options = this.options({
            command: 'save'
        });

        if (!options.command && !options.create) {
            grunt.log.error('gitstash requires a command parameter.');
            return;
        }

        var done = this.async();

        var args = ["stash"];
        args.push(options.command);
        if (options.stash) {
            args.push("stash@{" + options.stash + "}");
        }
        if (options.staged) {
            args.push("--index");
        }

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitclone', 'Clone repositories.', function () {
        var options = this.options({
                bare: false,
                branch: false,
                repository: false,
                directory: false
            }),
            done = this.async(),
            args = ['clone'];

        // repo is the sole required option, allow shorthand
        if (!options.repository) {
            grunt.log.error('gitclone tasks requires that you specify a "repository"');
        }

        if (options.bare) {
            args.push('--bare');
        }

        if (options.branch && !options.bare) {
            args.push('--branch');
            args.push(options.branch);
        }

        // repo comes after the options
        args.push(options.repo || options.repository);

        // final argument is checkout directory (optional)
        if (options.directory) {
            args.push(options.directory);
        }

        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitreset', 'Reset to the branch HEAD', function () {
        var options = this.options({
            commit: 'HEAD'
        });

        var done = this.async();

        var args = ["reset"];
        if (options.mode) {
            args.push("--" + options.mode);
        }
        args.push(options.commit);
        if (!options.mode) {
            this.files.forEach(function (files) {
                for (var i = 0; i < files.src.length; i++) {
                    args.push(files.src[i]);
                }
            });
        }

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });
    grunt.registerMultiTask('gitcheckout', 'Checkout a git branch.', function () {
        var options = this.options({
        });

        if (!options.branch) {
            grunt.log.error('gitcheckout requires a branch parameter.');
            return;
        }

        var done = this.async();

        var args = ["checkout"];
        if (options.create) {
            args.push("-b");
        }
        args.push(options.branch);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

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
                if (options.tracking) {
                    if (Object.prototype.toString.call(options.tracking) === "[object Array]") {
                        options.tracking.forEach(function (item) {
                            args = args.concat(['-t', item]);
                        });
                    } else {
                        args = args.concat(['-t', options.tracking]);
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
            default:
                grunt.log.error('gitremote ' + options.command + ' is unknown');
                return;                  
            }
        }
 
 
        var done = this.async();
        

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });        
    
    });
    
    
    grunt.registerMultiTask('gitsubmodule', 'Add, Remove and Update git submodules', function () {
        var options = this.options({
            command: 'status'
        });

        
        var args = ["submodule"];
        switch (options.command) {
        case 'add':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['add']);
            if (options.branch) {
                args = args.concat(['-b', options.branch]);
            }
            if (options.force) {
                args = args.concat(['--force']);
            }
            if (options.name) {
                args = args.concat(['--name', options.name]);
            }
            if (options.reference) {
                args = args.concat(['--reference', options.reference]);
            }
            if (options["break"]) {
                args = args.concat(['--']);
            }
            if (options.repositiory) {
                args = args.concat([options.repositiory]);
            } else {
                grunt.log.error('gitsubmodule add requires a repository.');
                return;
            }
            if (options.path) {
                args = args.concat([options.path]);
            } 
            break;
        case 'status':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['status']);
            if (options.cached) {
                args = args.concat(['--cached']);
            }
            if (options.recursive) {
                args = args.concat(['--recursive']);
            }
            if (options["break"]) {
                args = args.concat(['--']);
            }
            if (options.path) {
                if (Object.prototype.toString.call(options.path) === "[object Array]") {
                    args = args.concat(options.path);
                } else {
                    args = args.concat([options.path]);
                }
            }                 
            break;
        case 'init':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['init']);
            if (options["break"]) {
                args = args.concat(['--']);
            }
            if (options.path) {
                if (Object.prototype.toString.call(options.path) === "[object Array]") {
                    args = args.concat(options.path);
                } else {
                    args = args.concat([options.path]);
                }
            }                         
            break;
        case 'update':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['update']);
            
            if (options.init) {
                args = args.concat(['--init']);
            }
            if (options.noFetch) {
                args = args.concat(['--no-fetch']);
            }  
            if (options.rebase) {
                args = args.concat(['--rebase']);
            }
            if (options.reference) {
                args = args.concat(['--reference', options.reference]);
            }
            if (options.merge) {
                args = args.concat(['--merge']);
            }

            if (options.recursive) {
                args = args.concat(['--recursive']);
            }
            if (options["break"]) {
                args = args.concat(['--']);
            }                
            if (options.path) {
                if (Object.prototype.toString.call(options.path) === "[object Array]") {
                    args = args.concat(options.path);
                } else {
                    args = args.concat([options.path]);
                }
            }            
            break;
        case 'summary':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['summary']);
            if (options.cached) {
                args = args.concat(['--cached']);
            }                
            if (options.files) {
                args = args.concat(['--files']);
            } 
            if (options.summaryLimit) {
                args = args.concat(['--summary-limit', options.summaryLimit]);
            } 
            if (options.commit) {
                args = args.concat([options.commit]);
            }
            if (options["break"]) {
                args = args.concat(['--']);
            }                
            if (options.path) {
                if (Object.prototype.toString.call(options.path) === "[object Array]") {
                    args = args.concat(options.path);
                } else {
                    args = args.concat([options.path]);
                }
            }            
            
            break;
        case 'foreach':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['foreach']);
            if (options.recursive) {
                args = args.concat(['--recursive']);
            }
            if (options.cmd) {
                args = args.concat([options.cmd]);
            } else {
                grunt.log.error('gitsubmodule ' + options.command + ' is unknown');
                return;
            }
            break;
        case 'sync':
            if (options.quiet) {
                args = args.concat(['--quiet']);
            }
            args = args.concat(['sync']);
            if (options["break"]) {
                args = args.concat(['--']);
            }                
            if (options.path) {
                if (Object.prototype.toString.call(options.path) === "[object Array]") {
                    args = args.concat(options.path);
                } else {
                    args = args.concat([options.path]);
                }
            }            
            
            break;
        default:
            grunt.log.error('gitsubmodule ' + options.command + ' is unknown');
            return;                
        }
        var done = this.async();



        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });
};
