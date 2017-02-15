'use strict';

let helpers = require('../helpers');
let Promise = require('bluebird');

//let beginTransaction = function() {
//    return new Promise((resolve, reject) => {
//        this.connection.beginTransaction((error, result) => {
//            if (error) {
//                return reject(error);
//            }
//
//            if (!result) {
//                return reject(new Error('begin transaction returned no result'));
//            }
//
//            this.transactionId = result._id;
//            resolve(result);
//        });
//    });
//};
//
//let addStatements = function() {
//    return new Promise((resolve, reject) => {
//        this.connection.addStatementsToTransaction(this.transactionId, this.statements, (error, result) => {
//            if (error) {
//                return reject({
//                    error   : error,
//                    result  : result
//                });
//            }
//
//            if (!result) {
//                return reject(new Error('cannot add statements, transaction does not exist'));
//            }
//
//            this.results = result.results;
//
//            resolve(result);
//        });
//    });
//};
//
//let commit = function() {
//    return new Promise((resolve, reject) => {
//        this.connection.commitTransaction(this.transactionId, (error, result) => {
//            if (error) {
//                return reject(error);
//            }
//
//            if (!result) {
//                return reject(new Error('cannot commit, transaction does not exist'));
//            }
//
//            resolve(this.results);
//        });
//    });
//};

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
        statements      : statements,
        results         : null
    };

    return Promise.resolve()
        .bind(context)
        .then(helpers.connect)
        .then(beginAndCommit);

        //.then(beginTransaction)
        //.then(addStatements)
        //.then(commit);
};