var bower = require('bower');
var Q = require('q');
var _ = require('lodash');




exports.list = function(options) {
	
	var options = options || {};
	var deferred = Q.defer();

	_.defaults(options, {
		paths: false,
		offline: false
	});

	bower.commands.list(options, { json: true}).on('end',function(data) {
		deferred.resolve(data);
	});

	return deferred.promise;
}
