/*global expect, describe, it*/

"use strict";

describe('parser.js', function () {

	var path = require('path');	
	var rewire = require('rewire');
	var _	= require('lodash');
	var Q	= require('q');

	var module = rewire('../../lib/parser');
	var fixture = require('../fixture/bower_list.json');
	var expected =  {
		paths: { component: 'bower_components/component/component' },
		packages: [
			{
				name: 'package-2',
				location: 'bower_components/package-2',
				main: 'package-2.js'
			},
			{
				name: 'package-1',
				location: 'bower_components/package-1',
				main: 'package-1.js'
			}
		] 
	};
	
	module.__set__({
		fs: {
			existsSync: function() { return true; }
		},
		path: {
			relative: path.relative,
			normalize: path.normalize,
			join: path.join
		},
		requirejs: {
			read: function() { return new Q({}); }
		}
	});

	it('should return a promise', function(done) {
		module.config(fixture).then(function(result){
			done();
		}, done);
	}, 250);

	it('should return a list of bower dependencies as require paths', function(done) {
		module.config(fixture).then(function(result){
			expect(_.isEqual(expected, result)).toBe(true);
			done();
		}, done);
	}, 250);
});
