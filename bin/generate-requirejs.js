#!/usr/bin/env node
'use strict';

var pkg = require('../package.json');
var opts = require('minimist')(process.argv.slice(2));
var generator = require('../lib');

function init() {
	generator({
		src: opts._[0],
		out: opts.o || opts.out || opts._[0]
	});
}

function help() {
  var out = [
    'Usage: generate-requirejs source',
    '',
    'General options:',
    '  -h, --help           # Print options and usage',
    '  -v, --version        # Print the version number',
    '  -o, --out            # Output result to file',
    ''
  ];

  return out.join('\n');
}

function pre() {

	console.log(opts);
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

