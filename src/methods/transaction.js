'use strict';

let helpers = require('../helpers');
let Promise = require('bluebird');

const mapOutput = function(results) {
    let mappedResults = [];

    if (results && results.data && results.columns) {
        results.data.forEach((resultBlocks, i) => {
            const mappedResult = {};

            resultBlocks = [].concat(resultBlocks);

            resultBlocks.forEach((result, j) => {
                mappedResult[results.columns[j]] = result;
            });

            mappedResults.push(mappedResult);
        });
    }

    return mappedResults;
};

let beginAndCommit = function() {
    return new Promise((resolve, reject) => {
        this.connection.beginAndCommitTransaction(this.statements, (error, result) => {
            if (error) {
                return reject(error);
            }

            if (!result) {
                return reject(new Error('begin transaction returned no result'));
            }

            resolve(result.results);
        });
    });
};

module.exports = function(statements) {
    let context = {
        plugin          : this,
        connection      : null,
        transactionId   : null,
        statements      : { statements: statements },
        results         : null
    };

    return Promise.resolve()
        .bind(context)
        .then(helpers.connect)
        .then(beginAndCommit)
        .then(mapOutput);

};
