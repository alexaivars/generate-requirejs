describe('Config', function () {

	var rewire = require('rewire');
	var _	= require('lodash');
	var Q	= require('q');

	var module = rewire('../../lib/config');
	module.__set__({
		requirejs: {
			read: function() {
				return Q({
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
	
	var data =  {
		paths: { 'b':'c', 'app':'other'},
		packages:[ 
			{ 
				name: 'component',
			  location: 'bower_components/component.js',
				main: 'component.js'
			}
		] 
	};

	it('should merge generated config to existing config file', function(done) {
		done();
	}, 250);

});
