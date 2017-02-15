'use strict';

const helpers = require('../helpers');
const Promise = require('bluebird');

const run = function() {
    return new Promise((resolve, reject) => {
        this.connection.cypherQuery(this.query, this.params, function(error, result) {
            if (error) return reject(error);
            return resolve(result);
        });
    });
};

const mapOutput = function(results) {
    let mappedResults = [];

    if (results && results.data && results.columns) {
        results.data.forEach((resultBlocks, i) => {
            const mappedResult = {};

            resultBlocks.forEach((result, j) => {
                mappedResult[results.columns[j]] = result;
            });

            mappedResults.push(mappedResult);
        });
    }

    return mappedResults;
};

module.exports = function(query, params) {
    const context = {
        plugin      : this,
        connection  : null,
        query           : query,
        params      : params
    };

    return Promise.resolve()
        .bind(context)
        .then(helpers.connect)
        .then(run)
        .then(mapOutput);
};
