'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote - sethead', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_set_head', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should define HEAD for remote branch', function (done) {
        fs.exists(repo.path + '/.git/refs/remotes/testing/HEAD', function (exists) {
            assert(exists);
        });
        done();
    });


});
