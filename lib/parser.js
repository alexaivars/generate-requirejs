var Q = require('q');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

BowerAsset = (function() {
	function BowerAsset(name, location, main, config) {
		this.name = name;
		this.location = location;
		this.main = main;
		if(config) {
			this.config = config;
		}
	}

	BowerAsset.prototype.toPackage = function() {
		return {
			name: this.name,
			location: this.location,
			main: this.main
		}
	}

	return BowerAsset;
})();

function normalizeName(name) {
	return name.trim().replace(/\.js$/g,'');
}

function resolveMain(component) {		
	var main = component.pkgMeta.main;
	if(_.isArray(main)) {
		main = _.filter(main, function(name) {
			return (/\.js$/).test(name);
		});
		main = main[0];
	};


	if(_.isEmpty(main) && fs.existsSync(path.join(component.canonicalDir, component.pkgMeta.name + ".js"))) {
		main = component.pkgMeta.name + ".js";
	}

	if(_.isEmpty(main)) {
		return "missing:";
	}

	return path.normalize(main);	
}

function reduceAssets(result, component, name) {
	if(component.missing) {
		throw new Error('Bower component not installed');
	}

	if(!_.isEmpty(component.dependencies)) {
		_.reduce(component.dependencies, reduceAssets, result, this);	
	}

	result[name] = new BowerAsset(normalizeName(name),
																path.relative(this.canonicalDir, component.canonicalDir),
																resolveMain(component),
																component.pkgMeta.rjsConfig);
	return result;
}

function reduceDependencies(result, component, name) {
	if(component.dependencies) {
		_.reduce(component.dependencies, reduceDependencies, result);
	}
	return _.merge(result, component.pkgMeta.dependencies);
}

function reducePackages(result, component, name) {
	result[name] = this[name].toPackage();
	return result;
}


module.exports = function(data) {
		var deferred = Q.defer();

		var dependenciesList = _.reduce([data], reduceDependencies, {});
		var assets = _.reduce(data.dependencies, reduceAssets, {}, data);
		
		var config = {
			packages: _.values(_.reduce(dependenciesList, reducePackages, {}, assets))
		};
		
		deferred.resolve(config);
		return deferred.promise;
};

