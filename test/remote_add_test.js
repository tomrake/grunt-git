'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('remote - add', function () {
    var repo = null;
    var data;

    before(function (done) {
        common.setupAndRun('remote_add', function (err, r) {
            repo = r;
            done(err);
        });
    });


    it('should create remote', function (done) {
        fs.readFile(repo.path + '/.git/config', 'utf8', function (err, data) {
            assert(data.match(/\[remote \"testing\"\]/));
            done();
        });
    });


});
