
"use strict";

function BowerAsset(name, location, main, meta) {
	this.name = name;
	this.location = location;
	this.main = main;
	this.meta = meta;
}

BowerAsset.prototype.toPackage = function() {
	return {
		name: this.name,
		location: this.location,
		main: this.main
	};
};

module.exports = BowerAsset;

