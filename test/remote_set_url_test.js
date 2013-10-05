'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote - set_url - change', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set_url', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should change the url', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert.equal(message, "https://github.com/tomrake/grunt-git.git");
        }, "remote.testing.url");
        done();
    });
    
});