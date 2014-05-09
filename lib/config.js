
"use strict";

var requirejs = require('./requirejs');
var _ = require('lodash');

function Config(options) {
	this.src = options.src;
	this.out = options.out;
}

Config.prototype.add = function(data) {
	return requirejs.read(this.src)
		.then(function(config){
			return _.merge(config, data, function(objectValue, sourceValue){
				return _.isString(objectValue) ? objectValue : undefined;
			});
		})
		.then(function(data){
			return requirejs.write(this.out, data);
		}.bind(this));
};

module.exports = Config;

