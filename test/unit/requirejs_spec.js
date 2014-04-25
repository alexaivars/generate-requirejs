/*global expect, describe, it*/

"use strict";

describe('Requirejs config file interface', function () {
	var rewire = require('rewire');
	var Q = require('q');

	var module = rewire('../../lib/requirejs');
	
	// integration deps
	module.__set__({
		// mock away r.js implementation
		getConfig: function() { return new Q('get'); },
		setConfig: function() { return new Q('set'); },

		// mock away fs 
		read: function(value, cb) { return new Q('read'); },
		write: function(value, data, cb) { return new Q('write'); },
		fs: {
			exists: function(value, cb) {
				cb();
			}
		}
	});

	it('read should return a string value promise', function(done) {
		module.read('path').then(function(result) {
			expect(result).toBe('get');
			done();
		}).fail(done);
	}, 250);

	it('write should return a string value promise', function(done) {
		module.write('path').then(function(result) {
			expect(result).toBe('set');
			done();
		}).fail(done);
	}, 250);

});
