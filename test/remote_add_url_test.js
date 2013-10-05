'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote - add url - change', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_add_url', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should change add a url', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert(message.match(/https\:\/\/github.com\/tomrake\/grunt\-git.git/));
            assert(message.match(/https\:\/\/github.com\/rubenv\/grunt\-git.git/));
        }, "remote.testing.url");
        done();
    });
    
});