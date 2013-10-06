'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:set-url:add push', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set-url_add_push', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should change remove a push url', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert(message.match(/https\:\/\/github.com\/tomrake\/grunt\-git.git/));
            done(err);
        }, "remote.testing.pushurl");
    });
    
});