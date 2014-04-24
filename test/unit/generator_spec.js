
describe('generator', function () {
	var rewire = require('rewire');
	var Q = require('q');
	var _ = require('lodash');

	var module = rewire('../../lib/index.js');
	
	module.__set__({
		bower: {
			list: function() {
				return new Q({
					endpoint:
						{ 
							name: 'generate-requirejs',
							source: '/Users/alex/projects/generate-requirejs',
							target: '*' 
						},
						canonicalDir: '/Users/alex/projects/generate-requirejs',
						pkgMeta: { 
							name: 'generate-requirejs',
							dependencies: {},
							devDependencies: {} 
						},
						dependencies: {},
						nrDependants: 0,
						versions: []
				});
			}
		}
	});


});
