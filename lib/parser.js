
"use strict";

var Q = require('q');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var requirejs = require('./requirejs');
var Asset = require('./asset');


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
	}


	if(_.isEmpty(main) && fs.existsSync(path.join(component.canonicalDir, component.pkgMeta.name + ".js"))) {
		main = component.pkgMeta.name + ".js";
	}

	if(_.isEmpty(main)) {
		return "missing:";
	}

	return path.normalize(main);	
}

function reduceAssets(result, component, name) {
	 /*jshint validthis:true */ 
	if(component.missing) {
		throw new Error('Bower component not installed');
	}

	if(!_.isEmpty(component.dependencies)) {
		_.reduce(component.dependencies, reduceAssets, result, this);	
	}
	result[name] = new Asset(normalizeName(name),
																path.relative(this.canonicalDir, component.canonicalDir),
																resolveMain(component),
																_.merge(_.pick(component, 'canonicalDir'), _.pick(component.pkgMeta,'requirejs')));
	return result;
}

function reduceDependencies(result, component, name) {
	if(component.dependencies) {
		_.reduce(component.dependencies, reduceDependencies, result);
	}
	return _.merge(result, component.pkgMeta.dependencies);
}

function reducePackages(result, component, name) {
	 /*jshint validthis:true */ 
	if(this[name].meta.requirejs) { 
		result[normalizeName(name)] = this[name].toPackage();
	}
	return result;
}

function reducePaths(result, component, name) {
	 /*jshint validthis:true */ 
	if(!this[name].meta.requirejs) { 
		result[normalizeName(name)] = this[name].path();
	}
	return result;
}



// Todo: rename and clean this function.
function assetConfig(data) {
	
	
	var assets = _.reduce(data.dependencies, reduceAssets, {}, data);
	var promises = _.reduce(assets, function(result, component){
		if(component.meta.requirejs && component.meta.requirejs.config) {
			result.push(requirejs.read(path.join(component.meta.canonicalDir, component.meta.requirejs.config)));
		}
		return result;
	}, []);
	
	var promis = Q.all(promises).then(function(results){
		return _.reduce(results, _.merge, {});
	});

	return promis;

}

exports.config = function(data) {
		// var deferred = Q.defer();

		
		var dependenciesList = _.reduce([data], reduceDependencies, {});
		var assets = _.reduce(data.dependencies, reduceAssets, {}, data);
		
		var config = {
			paths: _.reduce(dependenciesList, reducePaths, {}, assets),
			packages: _.values(_.reduce(dependenciesList, reducePackages, {}, assets))
		};

		// (QD) this should be solved more elegantly.
		return assetConfig(data).then(function(data){
			return _.merge(data, config);
		});
		// deferred.resolve(config);
		// return deferred.promise;
};

