# generate-requirejs.js
  Adds a list of your current bower dependencies to your requirejs config file.
  
# install

With [npm](http://npmjs.org) do:

```
npm install alexaivars/generate-requirejs
```

# usage

This package also ships with a `generate-requirejs` command.

```
Usage: generate-requirejs config.js

If the config file does not exists, one will be created.

General options:
  -h, --help           # Print options and usage
  -v, --version        # Print the version number
	-o, --out            # Output result to file
```

# bower modules

generate-requirejs will merge requirejs configs defined in a components bower.json

bower.json
```
{
  "name": "component",
  "main": "index.js",
  "description": "a component",
	"requirejs": {
  	"config": "config.js"
  }
}
```

