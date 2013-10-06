'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:set-url:delete-push', function () {
    var repo = null;
    var data;

    before(function (done) { 
        common.setupAndRun('remote_set-url_delete_push', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should remove a push url', function (done) {
        repo.readConfigMessage(function (err, message, code) {
            assert.equal(1, code);
            done();
        }, "remote.testing.pushurl");
    });
    
});