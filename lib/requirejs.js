
"use strict";

var Q = require('q');
var fs = require('fs');
var requirejs = require('requirejs/bin/r.js');

var read = Q.denodeify(fs.readFile);
var write = Q.denodeify(fs.writeFile);


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
		deferred.resolve(result);
	});

	return deferred.promise;
}

function checkConfig(path) {
	var deferred = Q.defer();
	fs.exists(path, function(exists) {
		if (exists) {
			deferred.resolve(path);
		} else {
			deferred.resolve(write(path, 'requirejs.config({});').then(function(){
				return path;
			}));
		}
	});
	return deferred.promise;
}

exports.read = function(path) {
	return checkConfig(path)
		.then(function(path){
			return read(path, 'utf-8');
		})
		.then(getConfig);
};

exports.write = function(path, data) {
	return checkConfig(path)
		.then(function(path){
			return read(path, 'utf-8');
		})
		.then(function(file){
			return setConfig(file, data);		
		})
		.then(function(file){
			return write(path, file).then(function(){
				return file;
			});
		});
};
