'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:set-url:add', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set-url_add', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should add a url', function (done) {
        repo.readConfigMessage(function (err, message) {
            assert(message.match(/https\:\/\/github.com\/tomrake\/grunt-git.git/));
            done(err);
        }, "remote.testing.url");
    });
    
});