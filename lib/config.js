
"use strict";

var requirejs = require('./requirejs');
var _ = require('lodash');

function Config(path) {
	this.path = path;
}

Config.prototype.add = function(data) {
	return requirejs.read(this.path)
		.then(function(config){
			return _.merge(config, data, function(objectValue, sourceValue){
				return _.isString(objectValue) ? objectValue : undefined;
			});
		})
		.then(function(data){
			return requirejs.write(this.path, data);
		}.bind(this));
};

module.exports = Config;

