#!/usr/bin/env node
'use strict';

var pkg = require('../package.json');
var opts = require('minimist')(process.argv.slice(2));
var generator = require('../lib');

function init() {

	generator({
		config: opts._[0]
	});
}

function help() {
  var out = [
    'Usage: generate-requirejs ./config.js',
    '',
    'General options:',
    '  -h, --help           # Print options and usage',
    '  -v, --version        # Print the version number',
    ''
  ];

  return out.join('\n');
}

function pre() {
   
	if (opts.version || opts.v) {
    return console.log(pkg.version);
  }
  
	if (opts._.length === 1) {
    init();
  }	else {
		return console.log(help());
	}
	
}
pre();

