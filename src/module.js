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

fs.readdirSync(__dirname + '/methods').forEach((file) => {
    var method = file.substr(0, file.indexOf('.'));

    Module.prototype[method] = require('./methods/' + method);
});

module.exports = Module;
