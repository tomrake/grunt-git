'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote - rename', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_rename', function (err, r) {
            repo = r;
            done(err);
        });
    });
    
    it('should rename a remote in the config', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert.equal(message, "https://github.com/rubenv/grunt-git.git");
        }, "remote.testing.url");
        done();
    });
    
});
