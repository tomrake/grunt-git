'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:set-branches', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set_branches', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should create a remote in the config that will fetch two branches', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert(message.match(/\+refs\/heads\/master\:refs\/remotes\/testing\/master/));
            assert(message.match(/\+refs\/heads\/test\:refs\/remotes\/testing\/test/));
            done(err);
        }, "remote.testing.fetch");
    });


});
