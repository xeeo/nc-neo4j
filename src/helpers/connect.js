'use strict';

let Neo4j       = require('node-neo4j');

module.exports = function() {
    this.connection = new Neo4j(this.plugin.options.url, this.plugin.options.auth);

    return Promise.resolve(this.connection);
};