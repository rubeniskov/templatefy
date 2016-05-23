#!/usr/bin/env node

/**
 * Module dependencies.
 */

const
    reg_delmiter = /\-/ig,
    under = require('underscore'),
    valtree = require('valtree'),
    path = require('path'),
    fs = require('fs'),
    util = require('util'),
    tty = process.stdin.isTTY,
    Templatefy = require('./templatefy'),
    options = {};
    under.each(under.extend(require('nomnom')

/**
 * Command line options.
 */

        .option('input', {
            abbr: 'i',
            help: 'Input html file or string template',
            required: tty,
            trasnform: function(value) {
                console.log(value);
                return tty ? value : process.stdin;
            }
        })
        .option('output', {
            abbr: 'o',
            help: 'Output compiled JavaScript file templated'
        })
        .option('scope', {
            abbr: 's',
            flag: true,
            default: false,
            help: 'Enable scope function to prevent collition declarations'
        })
        .option('exports', {
            abbr: 'e',
            flag: true,
            default: false,
            help: 'Exports the template using commonjs module exports'
        })
        .option('var', {
            abbr: 'r',
            help: 'Store the template into a variable'
        })
        .option('global', {
            abbr: 'g',
            help: 'Store the template into a global property <global:property>'
        })
        .option('angular', {
            abbr: 'a',
            flag: true,
            default: Templatefy.defaults.angular,
            help: 'Enable Angular templateCache injection; for angular options use --angular-<option-name>',
            transform: function(value){
                return value === true ? {} : false;
            }
        })
        .option('linter', {
            abbr: 'l',
            flag: true,
            default: Templatefy.defaults.linter,
            help: 'Enable Linter validation; for linter options use --linter-<option-name>',
            transform: function(value){
                return value === true ? {} : false;
            }
        })
        .option('minify', {
            abbr: 'm',
            flag: true,
            default: Templatefy.defaults.minify,
            help: 'Enable log ouput; for log options use --minify-<option-name>',
            transform: function(value){
                return value === true ? {} : false;
            }
        })
        .option('log', {
            abbr: 'V',
            flag: true,
            default: !Templatefy.defaults.log,
            help: 'Enable log trace; for log options use --log-<option-name>'
        })
        .option('version', {
            abbr: 'v',
            flag: true,
            help: 'Print version and exit',
            callback: function() {
                return util.format("Version v%s", Templatefy.version);
            }
        })
        .parse(), {
            _input: null,
            _output: null
        }), function(val, key, opts) {
            switch(true){
              case key === '_input':
                  options.input = opts.input ? opts.input : 'stdin';
                  break;
              case key === '_output':
                  options.output = opts.output ? opts.output : 'stdout';
                  break;
              default:
                  valtree(options, key.replace(reg_delmiter, '.'), val);
                  break;
            }
        });

module.exports = Templatefy.parse(options, options.input, options.output);
