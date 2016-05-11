# Templatefy

[![Build Status][travis-img]][travis-url]
[![License][license-img]][license-url]
[![Coverage Status][coverage-img]][coverage-url]
[![Version][version-img]][site-url]
[![Downloads][downloads-img]][site-url]

Templatefy is a html template manager with js injection, angular supported.

[![NPM][npm-img]][npm-url]

Installation
============

Install with `npm install templatefy --save`.

Usage
=====

To use, add the `require` node module:

```JavaScript

    const Templatefy = require('templatefy');

    Templatefy.parse({
        angular: true
    }, 'path/of/input-file', 'path/of/ouput-file');

```

[![WTF][wtfpl-img]][wtfpl-url]

[site-url]: http://templatefy.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/templatefy
[npm-img]: https://nodei.co/npm/templatefy.png?downloads=true

[travis-url]: https://travis-ci.org/rubeniskov/templatefy?branch=master
[travis-img]: https://travis-ci.org/rubeniskov/templatefy.svg?style=flat-square

[license-url]: LICENSE
[license-img]: https://img.shields.io/badge/license-WTFPL-blue.svg?style=flat-square

[coverage-url]: https://codecov.io/github/rubeniskov/templatefy
[coverage-img]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg?style=flat-square

[version-img]: https://img.shields.io/npm/v/templatefy.svg?style=flat-square&maxAge=2592000
[downloads-img]: https://img.shields.io/npm/dm/templatefy.svg?style=flat-square&maxAge=2592000

[wtfpl-url]: http://www.wtfpl.net/
[wtfpl-img]: http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg
