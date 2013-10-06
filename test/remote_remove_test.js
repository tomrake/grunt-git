'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote:remove', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_remove', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should remove a remote in the config', function (done) {
        repo.readConfigMessage(function (err, message, code) {
            assert.equal(1, code);
            done();
        }, "remote.testing.url");
    });
    


});
