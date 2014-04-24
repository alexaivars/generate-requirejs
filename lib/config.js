var Q = require('q');
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
		}.bind(this))
		.then(function(data){
			return requirejs.write(this.path, data);
		}.bind(this))
		.fail(console.log);
};

module.exports = Config;

