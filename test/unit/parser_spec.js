
describe('Bower to requirejs dependency generator', function () {

	var path = require('path');	
	var rewire = require('rewire');
	var _	= require('lodash');

	var module = rewire('../../lib/parser');
	var fixture = require('../fixture/bower_list.json');
	var expected =  {
		packages:[ 
			{ 
				name: 'component',
			  location: 'bower_components/component.js',
				main: 'component.js'
			},
			{
				name: 'component',
			  location: 'bower_components/component',
				main: 'component.js'
			},
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
		}
	});

	it('should return a promise', function(done) {
		module(fixture).then(function(result){
			done();
		}, done);
	}, 250);

	it('should return a list of bower dependencies as require packages', function(done) {
		module(fixture).then(function(result){
			expect(_.isEqual(expected, result)).toBe(true);
			done();
		}, done);
	}, 250);
});
