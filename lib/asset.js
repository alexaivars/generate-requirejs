
"use strict";

var path = require('path');

function BowerAsset(name, location, main, meta) {
	this.name = name;
	this.location = location;
	this.main = main;
	this.meta = meta || {};
	
	if(meta.requirejs && meta.requirejs.config) {
		this.location = path.join(this.location, path.dirname(meta.requirejs.config));
		this.main = path.relative(path.dirname(meta.requirejs.config), this.main);
	}

}

BowerAsset.prototype.toPackage = function() {
	return {
		name: this.name,
		location: this.location,
		main: this.main
	};
};

BowerAsset.prototype.path = function() {
	return path.join(this.location, path.basename(this.main, path.extname(this.main)));
};

module.exports = BowerAsset;

