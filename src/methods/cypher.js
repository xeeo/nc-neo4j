'use strict';

let helpers = require('../helpers');
let Promise = require('bluebird');

let run = function() {
    return new Promise((resolve, reject) => {
        this.connection.cypherQuery(this.q, this.params, function(error, result) {
            if (error) {
                return reject(error);
            }

            return resolve(result);
        });
    });
};

module.exports = function(q, params) {
    let context = {
        plugin      : this,
        connection  : null,
        q           : q,
        params      : params
    };

    return Promise.resolve()
        .bind(context)
        .then(helpers.connect)
        .then(run);
};