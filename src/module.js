'use strict';

const singleton = require('nc-singleton');
const fs        = require('fs');

const _options = Symbol('options');

class Module {
    constructor() {
        return singleton.call(this, Module);
    }

    config(options) {
        this[_options] = options;
    }

    get options() {
        return this[_options];
    }
}

Module.prototype.cypher      = require('./methods/cypher');
Module.prototype.transaction = require('./methods/transaction');

module.exports = Module;
