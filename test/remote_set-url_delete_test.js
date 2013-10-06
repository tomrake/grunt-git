'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:set_url:delete', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set-url_delete', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should remove a url', function (done) {
        repo.readConfigMessage(function (err, message) {
            if (err) {
                done(err);
                return;
            }
            assert(message.match(/https\:\/\/github.com\/tomrake\/grunt\-git.git/));
            assert(!message.match(/https\:\/\/github.com\/rubenv\/grunt\-git.git/));
            done(err);
        }, "remote.testing.url");
    });
    
});