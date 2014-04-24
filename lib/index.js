var bower = require('./bower');
var parse = require('./parser');

var Config = require('./config');
var Q = require('q');


module.exports = function (opts, done) {
	var config = new Config(opts.config);

	if (!done) {
		done = function () {};
	}

	function run() {
		return bower
			.list()
			.then(parse)
			.then(function(data){
				return config.add(data);
			})
			.then(function(){
				done();
			})
			.fail(console.log);
	}

	return run();
}
