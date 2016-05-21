# Templatefy

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Climate Status][codeclimate-badge]][codeclimate-url]
[![Issues Open][issues-open-badge]][issues-url]
[![Issue Resolution][issues-reso-badge]][issues-url]

[![Version][version-badge]][npm-url]
[![Node][node-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Slack Status][slack-badge]][slack-url]
[![License][license-badge]][license-url]

[Templatefy][site-url] is a html template manager with js injection, angular supported.

[![NPM][npm-img]][npm-url]
[![GRID][coverage-img]][coverage-url]

Installation
============

Install with `npm install templatefy --save`.

Usage
=====

To use, add the `require` node module:

```JavaScript

    const Templatefy = require('templatefy');

    Templatefy.parse('path/of/input-file.html', 'path/of/ouput-file.js');

    // path/of/input-file.html
    // <h1><h2><h3>

    // path/of/ouput-file.js
    // '<h1><h2><h3></h3></h2></h1>'

```

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

[![WTF][wtfpl-img]][wtfpl-url]

[site-url]: http://templatefy.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/templatefy
[npm-img]: https://nodei.co/npm/templatefy.png?downloads=true

[travis-url]: https://travis-ci.org/rubeniskov/templatefy?branch=master
[travis-badge]: https://travis-ci.org/rubeniskov/templatefy.svg

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-WTFPL-blue.svg

[codeclimate-url]: https://codeclimate.com/github/rubeniskov/templatefy
[codeclimate-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/gpa.svg

[coverage-url]: https://codecov.io/github/rubeniskov/templatefy
[coverage-img]: https://codecov.io/gh/rubeniskov/templatefy/branch/master/graphs/icicle.svg?width=400&height=72
[coverage-badge]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg

[version-badge]: https://img.shields.io/npm/v/templatefy.svg
[downloads-badge]: https://img.shields.io/npm/dm/templatefy.svg
[node-badge]: https://img.shields.io/node/v/templatefy.svg

[issues-url]: https://github.com/rubeniskov/templatefy/issues
[issues-open-badge]: http://isitmaintained.com/badge/open/rubeniskov/templatefy.svg
[issues-reso-badge]: http://isitmaintained.com/badge/resolution/rubeniskov/templatefy.svg

[wtfpl-url]: http://www.wtfpl.net/
[wtfpl-img]: http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg
