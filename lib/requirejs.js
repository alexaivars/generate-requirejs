var Q = require('q');
var FS = require('fs');
var requirejs = require('requirejs/bin/r.js');

var read = Q.denodeify(FS.readFile);
var write = Q.denodeify(FS.writeFile);


function getConfig(file) {

	var deferred = Q.defer();

	requirejs.tools.useLib(function (require) {
		require('transform').modifyConfig(file, function (data) {
			deferred.resolve(data);
		});
	});
	
	return deferred.promise;
}

function setConfig(file, data) {

	var deferred = Q.defer();

	requirejs.tools.useLib(function (require) {
		var result = require('transform').modifyConfig(file, function (content) {
			return data;
		});
		
		console.log(result);
		
		deferred.resolve(result);
	});

	return deferred.promise;
}

exports.read = function(path) {
	return read(path, 'utf-8').then(getConfig);
}

exports.write = function(path, data) {
	return read(path, 'utf-8')
		.then(function(file){
			return setConfig(file, data);		
		})
		.then(function(file){
			return write(path, file);
		});
}
