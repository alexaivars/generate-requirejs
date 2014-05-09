
"use strict";

var bower = require('./bower');
var parse = require('./parser');

var Config = require('./config');


module.exports = function (options, done) {

	var config = new Config({ 
		src: options.src,
		out: options.out
	});

	if (!done) {
		done = function () {};
	}

	function run() {
		return bower
			.list()
			.then(parse.config)
			.then(config.add.bind(config))
			.then(function(config){
				console.log(config);
				done();
			})
			.fail(console.log);
	}

	return run();
};
