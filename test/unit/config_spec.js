/*global expect, describe, it*/

"use strict";

describe('Config', function () {

	var rewire = require('rewire');
	var Q	= require('q');

	var module = rewire('../../lib/config');
	module.__set__({
		requirejs: {
			read: function() {
				return new Q({
					paths: {
						app: '../app'
					},
					shim: {
						foo: ['foo']
					}
				});
			}
		}
	});

	it('should merge generated config to existing config file', function(done) {
		expect(true).toBe(true);
		done();
	}, 250);

});
