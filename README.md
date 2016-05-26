# ƬΞMPLATEFY

[![Build Status][travis-badge]][travis-url]
[![Version][version-badge]][npm-url]
[![Coverage Status][codeclimate-coverage-badge]][codecov-url]
[![GPA Status][codeclimate-gpa-badge]][codeclimate-url]
[![Commits][github-commits-badge]][npm-url]
[![Issues Open][issues-open-badge]][issues-url]
[![Issue Resolution][issues-reso-badge]][issues-url]

[![Node][node-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Slack Status][slack-badge]][slack-url]
[![Twitter][twitter-badge]][twitter-url]
[![Paypal][paypal-badge]][paypal-url]
[![Beerpay][beerpay-badge]][beerpay-url]
[![License][license-badge]][license-url]

[Templatefy][site-url] is a html template manager with js injection, angular supported.

[![NPM][npm-img]][npm-url]
[![NPM][npm-stats]][npm-url]
[![GRID][codecov-img]][codecov-url]

## Ƭ Table of contents

* [Motivation](#motivation)
* [Installation](#installation)
* [CLI Usage](#cli-command-line-interface)
  - [Options](#options-0)
  - [Usage](#usage-0)
* [API Usage](#api-application-programming-interface)
  - [Options](#options-1)
  - [Usage](#usage-1)
* [Live Examples](#live-examples)
* [Documentation](#documentation-wip)
* [Contributing](#contributing)
* [Community](#community)
* [Creators](#creators)
* [Copyright and license](#copyright-and-license)

## Ƭ Installation

Install with `npm install templatefy --save`.

## Ƭ CLI (Command line interface)

You can use Templatefy as command line tool, installing as global library with `npm i -g templatefy` and execute with the command `templatefy`.
To show options type: `templatefy --help` or with flag `-h`.

### Options

```plain
Usage: templatefy [options]

Options:
   -i, --input     Input html file or string template
   -o, --output    Output compiled JavaScript file templated
   -s, --scope     Enable scope function to prevent collition declarations  [false]
   -e, --exports   Exports the template using commonjs module exports  [false]
   -r, --var       Store the template into a variable
   -g, --global    Store the template into a global property <global:property>
   -a, --angular   Enable Angular templateCache injection; for angular options use --angular-<option-name>  [false]
   -l, --linter    Enable Linter validation; for linter options use --linter-<option-name>  [false]
   -m, --minify    Enable log ouput; for log options use --minify-<option-name>  [false]
   -V, --log       Enable log trace; for log options use --log-<option-name>  [false]
   -v, --version   Print version and exit

  █████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗██╗   ██╗
 ███╔═██╔══╝╚══════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝╚██╗ ██╔╝
 ╚══╝ ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  █████╗   ╚████╔╝  
      ██║   ╚════╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ██╔══╝    ╚██╔╝   
      ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗██║        ██║    
      ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝        ╚═╝  
```

[Go top](#table-of-contents)

### Usage

This example shows, how to pass the template through stdin and print the output into stdout:

```shell
echo '<h1>Foo</h1>' | templatefy --var=example

# ouput
# var example = '<h1>Foo</h1>';
```

As you can see, it's possible use any string passed into the templatefy stdin, another example using the command `cat`:

```shell
cat index.html | templatefy --exports

# ouput
# module.exports = '<h1>Foo</h1>';
```

If want parse a html file using the command arguments, you can define the file path using `--input` and `--ouput` to define the output result
By default if you don't define the `--output` it will be printed by stdout.

```shell
echo '<h1>Foo</h1>' > template.html

cat template.html | templatefy --exports
# or
templatefy --input=./template.html --exports
# or
templatefy --input="<h1>Foo</h1>" --exports

# ouput
# module.exports = '<h1>Foo</h1>';

cat template.html | templatefy --exports --ouput=./ouput.js

# contents of ouput.js
# module.exports = '<h1>Foo</h1>';
```

Note: **You can copy any pice of code from above and paste in your terminal.** Try it!.

[Go top](#table-of-contents)

## Ƭ API (Application Programming Interface)

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

[Go top](#table-of-contents)

### Usage

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

[Go top](#table-of-contents)

## Ƭ Live examples

Thanks to tonicdev.com you can test the bellow examples.

```JavaScript
    const Templatefy = require("templatefy")

    Templatefy.parse({
        angular: true
    },'<h1>{{Title}}<h2>{{Subtitle}}', function(err, data){
          console.log(data);
    });
```

[Try this snippet!!](https://tonicdev.com/rubeniskov/573fe76d605bca1100d6cf53)
[Go top](#table-of-contents)

## Ƭ Documentation (WIP)

I'm working hard to develop the documentation a soon as possible, sorry for the inconvenience.

[Go top](#table-of-contents)

## Ƭ Contributing (WIP)

### WIP

[Go top](#table-of-contents)


## Community

Get updates on Templatefy's development and chat with the project maintainers and community members.

* Follow me on [@rubeniskov on Twitter](https://twitter.com/rubeniskov) to get updates.
* Read and subscribe to [The Official Templatefy Page](http://templatefy.rubeniskov.com) (WIP).
* Join [the official Slack room](http://slack.rubeniskov.com/#templatefy).
* Chat with fellow templatefiers in IRC. On the `rubeniskov.irc.slack.com` server, in the `##templatefy` channel.
* Developers should use the keyword `templatefy` on packages which modify or add to the functionality of Templatefy when distributing through [npm](https://www.npmjs.com/browse/keyword/templatefy) or similar delivery mechanisms for maximum discoverability.

[Go top](#table-of-contents)

## Ƭ Creators

**Rubén López Gómez <me@rubeniskov.com>**

* <https://twitter.com/rubeniskov>
* <https://github.com/rubeniskov>
* <http://rubeniskov.com>

[Go top](#table-of-contents)

## Ƭ Copyright and license

Code copyright 2016 Rubeniskov released under [the MIT license][license-url].

[Go top](#table-of-contents)


[site-url]: http://templatefy.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/templatefy
[npm-img]: https://nodei.co/npm/templatefy.png?downloads=true&downloadRank=true&stars=true
[npm-stats]: https://nodei.co/npm-dl/templatefy.png?months=6&height=3

[travis-url]: https://travis-ci.org/rubeniskov/templatefy?branch=master
[travis-badge]: https://travis-ci.org/rubeniskov/templatefy.svg

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

[codeclimate-url]: https://codeclimate.com/github/rubeniskov/templatefy
[codeclimate-gpa-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/gpa.svg
[codeclimate-coverage-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/coverage.svg

[codecov-url]: https://codecov.io/github/rubeniskov/templatefy
[codecov-img]: https://codecov.io/gh/rubeniskov/templatefy/graphs/sunburst.svg
[codecov-badge]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg

[twitter-url]: https://twitter.com/rubeniskov
[twitter-badge]: https://img.shields.io/badge/follow-twitter-55acee.svg

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg

[github-commits-badge]: https://img.shields.io/github/commits-since/rubeniskov/templatefy/v0.0.1.svg
[version-badge]: https://img.shields.io/npm/v/templatefy.svg
[downloads-badge]: https://img.shields.io/npm/dm/templatefy.svg
[node-badge]: https://img.shields.io/node/v/templatefy.svg

[issues-url]: https://github.com/rubeniskov/templatefy/issues
[issues-open-badge]: http://isitmaintained.com/badge/open/rubeniskov/templatefy.svg
[issues-reso-badge]: http://isitmaintained.com/badge/resolution/rubeniskov/templatefy.svg

[paypal-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BZRRX3G6UXXEN
[paypal-badge]: https://img.shields.io/badge/donate-PayPal-00457c.svg

[beerpay-url]: https://beerpay.io/rubeniskov/templatefy
[beerpay-badge]: https://beerpay.io/rubeniskov/templatefy/badge.svg?style=flat
