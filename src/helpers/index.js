'use strict';

let fs      = require('fs');

let helpers = {};

fs.readdirSync(__dirname).forEach((file) => {
    let method = file.substr(0, file.indexOf('.'));

    helpers[method] = require('./' + method);
});

module.exports = helpers;