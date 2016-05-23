# Templatefy

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][codeclimate-coverage-badge]][codecov-url]
[![GPA Status][codeclimate-gpa-badge]][codeclimate-url]
[![Commits][github-commits-badge]][npm-url]
[![Issues Open][issues-open-badge]][issues-url]
[![Issue Resolution][issues-reso-badge]][issues-url]

[![Version][version-badge]][npm-url]
[![Node][node-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Slack Status][slack-badge]][slack-url]
[![License][license-badge]][license-url]

[Templatefy][site-url] is a html template manager with js injection, angular supported.

[![NPM][npm-img]][npm-url]
[![GRID][codecov-img]][codecov-url]

## Table of contents

* [Installation](#installation)
* [CLI Usage](#CLI)
  - [Options](#CLI)
  - [Examples](#CLI)
* [API Usage](#API)
  - [Options](#CLI)
  - [Examples](#CLI)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [Community](#community)
* [Creators](#creators)
* [Copyright and license](#copyright-and-license)


## Installation

Install with `npm install templatefy --save`.

## CLI (Command line interface)

You can use Templatefy as command line tool, installing as global library with `npm i -g templatefy` and execute with the command `templatefy`.
To show options type: `templatefy --help` or with flag `-h`.

### Options

```shell
Usage: /usr/local/bin/node templatefy [options]

Options:
   -i, --input     Input html file or string raw template
   -o, --output    Output compiled JavaScript file template
   -s, --scope     Enable scope function to prevent collition declarations  [false]
   -e, --exports   Exports the template using commonjs module exports  [false]
   -r, --var       Store the template into a variable
   -g, --global    Store the template into a global property <global:property>
   -a, --angular   Enable Angular templateCache injection; for angular options use --angular-<option-name>  [false]
   -l, --linter    Enable Linter validation; for linter options use --linter-<option-name>  [false]
   -m, --minify    Enable HTML minification process; for log options use --minify-<option-name>  [false]
   -V, --log       Enable log output; for minify options use --log-<option-name>  [false]
   -v, --version   Print version and exit
```

### Usage

This example shows how to pass through stdin a template obtaining the output to the stdout:

```shell
echo '<h1>Hola</h1>' | templatefy --var=example

# ouput
# var example = '<h1>Hola</h1>';
```

As you can see it's possible use any string passed into the templatefy stdin, another example using the command `cat`:

```shell
cat index.html | templatefy --exports

# ouput
# module.exports = '<h1>Hola</h1>';
```

If want parse a html file using the command arguments, you can define the file path using `--input` and `--ouput` to define the output result
By default if you don't define `--output` it be will print the result in the promt stdout.

```shell
echo '<h1>Hola</h1>' > template.html

cat template.html | templatefy --exports
# or
templatefy --input=./template.html --exports
# or
templatefy --input="<h1>Hola</h1>" --exports

# ouput
# module.exports = '<h1>Hola</h1>';

cat template.html | templatefy --exports --ouput=./ouput.js

# contents of ouput.js
# module.exports = '<h1>Hola</h1>';
```

Note: **you can copy the above code and paste in your terminal** try it!.

## API (Application Programming Interface)

To use, add the `require` node module:

```JavaScript

    const Templatefy = require('templatefy');

    Templatefy.parse('path/of/input-file.html', 'path/of/ouput-file.js');

```

#### Input (`path/of/input-file.html`)
```html
    <h1><h2><h3>
```

#### Output (`path/of/ouput-file.js`)
```JavaScript
    '<h1><h2><h3></h3></h2></h1>'
```

### Options

#### scope
Type: `Boolean`
Default: `false`

Enable function clousure for prevent variable collisions.

#### exports
Type: `Boolean`
Default: `false`

Enable commonjs module.exports.

#### global
Type: `String`
Default: `null`

Global variable expose `global:property`.

#### var
Type: `String`
Default: `null`

Local variable name.

#### angular
Type: `Boolean` `Object`
Default: `false`

Enable angular templateCache injection.

#### angular.shim
Type: `String`
Default: `angular`

Angular variable name or factory.

#### angular.module.name
Type: `String`
Default: `templatefy`

Angular templatefy module name.

#### angular.module.var
Type: `String`
Default: `templatefy`

Angular templatefy module variable name.

#### angular.module.name
Type: `String`
Default: `templatefy`

Angular templatefy module name.

#### angular.module.deps
Type: `Array` `String`
Default: `null`

Angular templatefy module dependencies.

#### angular.module.run.args
Type: `Array` `String`
Default: `null`

Angular templatefy module run dependencies.

#### angular.template
Type: `Array` `String`
Default: `null`

Angular templatefy template name.

Test in your browser
===================

[Try this snippet!!](https://tonicdev.com/rubeniskov/573fe76d605bca1100d6cf53)

```JavaScript
    const Templatefy = require("templatefy")

    Templatefy.parse({
        angular: true
    },'<h1>{{Title}}<h2>{{Subtitle}}', function(err, data){
          console.log(data);
    });
```

## Documentation

### TODO

## Community

Get updates on Templatefy's development and chat with the project maintainers and community members.

* Follow me on [@rubeniskov on Twitter](https://twitter.com/rubeniskov) to get updates.
* Read and subscribe to [The Official Templatefy Page](http://templatefy.rubeniskov.com).
* Join [the official Slack room](http://slack.rubeniskov.com/#templatefy).
* Chat with fellow templatefiers in IRC. On the `rubeniskov.irc.slack.com` server, in the `##templatefy` channel.
* Developers should use the keyword `templatefy` on packages which modify or add to the functionality of Templatefy when distributing through [npm](https://www.npmjs.com/browse/keyword/templatefy) or similar delivery mechanisms for maximum discoverability.

## Creators

**Rubén López Gómez <me@rubeniskov.com>**

* <https://twitter.com/rubeniskov>
* <https://github.com/rubeniskov>
* <http://rubeniskov.com>

## Copyright and license

Code copyright 2016 Rubeniskov released under [the MIT license][license-url].


[site-url]: http://templatefy.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/templatefy
[npm-img]: https://nodei.co/npm/templatefy.png?downloads=true

[travis-url]: https://travis-ci.org/rubeniskov/templatefy?branch=master
[travis-badge]: https://travis-ci.org/rubeniskov/templatefy.svg

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/rubeniskov/templatefy
[codeclimate-gpa-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/gpa.svg
[codeclimate-coverage-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/coverage.svg

[codecov-url]: https://codecov.io/github/rubeniskov/templatefy
[codecov-img]: https://codecov.io/gh/rubeniskov/templatefy/branch/master/graphs/icicle.svg?width=400&height=72
[codecov-badge]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg

[github-commits-badge]: https://img.shields.io/github/commits-since/rubeniskov/templatefy/v0.0.1.svg
[version-badge]: https://img.shields.io/npm/v/templatefy.svg
[downloads-badge]: https://img.shields.io/npm/dm/templatefy.svg
[node-badge]: https://img.shields.io/node/v/templatefy.svg

[issues-url]: https://github.com/rubeniskov/templatefy/issues
[issues-open-badge]: http://isitmaintained.com/badge/open/rubeniskov/templatefy.svg
[issues-reso-badge]: http://isitmaintained.com/badge/resolution/rubeniskov/templatefy.svg
