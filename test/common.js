'use strict';

var grunt = require('grunt');

function handleSpawnOutput(command, args, verbose_git, cb) {
    return function (error, result, code) {
                if (code) {
                    if (result.stdout) {
                        grunt.log.writeln(result.stdout);
                    }
                    grunt.log.errorlns('Error: ' + code);
                    if (result.stderr) {
                        grunt.log.errorlns(result.stderr);
                    }
                    cb(new Error('Error code: ' + code));
                } else {
                    if (verbose_git && result.stdout) {
                        grunt.log.writeln(result.stdout);
                    }
                    cb();
                }
            };
}

function runCommand(folder, command, args, verbose_git, cb) {
    grunt.util.spawn({
        cmd: command,
        args: args,
        opts: {
            cwd: folder
        }
    }, handleSpawnOutput(command, args, verbose_git, cb));
}

function genCommand(folder, command, args, verbose_git) {
    return function (cb) {
        runCommand(folder, command, args, verbose_git, cb);
    };
}

function Repo(path) {
    return {
        path: path,
        readConfigMessage: function (cb, key) {
            grunt.util.spawn({
                cmd: "git",
                args: ["config", "--get-all", key],
                opts: {
                    cwd: this.path
                }
            }, function (err, result, code) {
                if (err) {
                    return cb(err, result, code);
                } else {
                    return cb(null, result.stdout.trim());
                }
            });
        },
        readCommitMessage: function (cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["log", "--format=format:%s", "HEAD^.."],
                opts: {
                    cwd: this.path
                }
            }, function (err, result) {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, result.stdout.trim());
                }
            });
        }
    };
}

module.exports = {
    setupAndRun: function (fixture, before, done) {
        if (!done) {
            done = before;
            before = function (repo, cb) { cb(); };
        }

        grunt.file.mkdir('tmp');

        var repo = new Repo('tmp/' + fixture);

        grunt.file.mkdir(repo.path);
        grunt.file.copy('test/fixtures/' + fixture + '.js', repo.path + '/Gruntfile.js');

        grunt.util.async.series([
            genCommand(repo.path, 'git', ['init']),
            genCommand(repo.path, 'git', ['add', '.']),
            genCommand(repo.path, 'git', ['commit', '-m', 'Initial commit']),
            function (cb) {
                repo.initialRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
            function (cb) { before(repo, cb); },
            genCommand(repo.path, 'grunt', [], true),
            function (cb) {
                repo.currentRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
        ], function (err) {
            done(err, repo);
        });
    }
};
