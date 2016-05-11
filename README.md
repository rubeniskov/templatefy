# Templatefy

[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Slack Status][slack-badge]][slack-url]
[![Version][version-badge]][npm-url]
[![Downloads][downloads-badge]][npm-url]
[![Node][node-badge]][npm-url]
[![License][license-badge]][license-url]


[Templatefy][site-url] is a html template manager with js injection, angular supported.

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
[travis-badge]: https://travis-ci.org/rubeniskov/templatefy.svg?style=flat-square

[license-url]: LICENSE
[license-badge]: https://img.shields.io/badge/license-WTFPL-blue.svg?style=flat-square

[coverage-url]: https://codecov.io/github/rubeniskov/templatefy
[coverage-badge]: https://img.shields.io/codecov/c/github/rubeniskov/templatefy.svg?style=flat-square

[slack-url]: http://slack.rubeniskov.com/
[slack-badge]: http://slack.rubeniskov.com/badge.svg?style=flat-square&maxAge=2592000

[version-badge]: https://img.shields.io/npm/v/templatefy.svg?style=flat-square&maxAge=2592000
[downloads-badge]: https://img.shields.io/npm/dm/templatefy.svg?style=flat-square&maxAge=2592000
[node-badge]: https://img.shields.io/node/v/instsure.svg?style=flat-square


[wtfpl-url]: http://www.wtfpl.net/
[wtfpl-img]: http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl.svg
