# Templatefy

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Climate Status][codeclimate-badge]][codeclimate-url]
[![Issues Open][issues-open-badge]][issues-url]
[![Issue Resolution][issues-reso-badge]][issues-url]

[![Slack Status][slack-badge]][slack-url]
[![Version][version-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Node][node-badge]][npm-url]
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

    Templatefy.parse({
        angular: true
    }, 'path/of/input-file', 'path/of/ouput-file');

```

[![WTF][wtfpl-img]][wtfpl-url]

[site-url]: http://templatefy.rubeniskov.com

[npm-url]: https://www.npmjs.com/package/templatefy
[npm-img]: https://nodei.co/npm/templatefy.png?downloads=true

[travis-url]: https://travis-ci.org/rubeniskov/templatefy?branch=master
[travis-badge]: https://travis-ci.org/rubeniskov/templatefy.svg?style=flat-square

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-WTFPL-blue.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/rubeniskov/templatefy
[codeclimate-badge]: https://codeclimate.com/github/rubeniskov/templatefy/badges/gpa.svg

[coverage-url]: https://codecov.io/github/rubeniskov/templatefy
[coverage-img]: https://codecov.io/gh/rubeniskov/templatefy/branch/master/graphs/icicle.svg?width=400&height=72
[coverage-badge]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg?style=flat-square

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg?style=flat-square&maxAge=2592000

[version-badge]: https://img.shields.io/npm/v/templatefy.svg?style=flat-square&maxAge=2592000
[downloads-badge]: https://img.shields.io/npm/dm/templatefy.svg?style=flat-square&maxAge=2592000
[node-badge]: https://img.shields.io/node/v/templatefy.svg?style=flat-square

[issues-url]: https://github.com/rubeniskov/templatefy/issues
[issues-open-badge]: http://isitmaintained.com/badge/open/rubeniskov/templatefy.svg
[issues-reso-badge]: http://isitmaintained.com/badge/resolution/rubeniskov/templatefy.svg

[wtfpl-url]: http://www.wtfpl.net/
[wtfpl-img]: http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg
