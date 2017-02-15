'use strict';

require('../lib/chai');

let Plugin      = require('../../');
let Hoek        = require('hoek');

let mocks       = require('../mocks');

describe('Neo4J.cypher', function() {
    before(function() {
        let plugin = new Plugin();

        plugin.config(mocks.config);

        return plugin.cypher('MATCH (n:Test) DELETE n');
    });

    it('should run query', function() {
        let plugin = new Plugin();

        plugin.config(mocks.config);
        return plugin.cypher('CREATE (n:Person:Test { name : \'Raul\', title : \'CTO\' })')
            .then(function() {
                return plugin.cypher('MATCH (n:Person) RETURN n')
                .then(function(result) {
                    result.data.length.should.equal(1);
                });
            });
    });

    it('should throw db error', function() {
        let plugin = new Plugin();

        plugin.config(Hoek.applyToDefaults(mocks.config, {
            auth: ''
        }));

        return plugin.cypher('CREATE (n:Person:Test { name : \'Raul\', title : \'CTO\' })')
            .should.not.be.fulfilled;
    });

    it('should throw query problem', function() {
        let plugin = new Plugin();

        plugin.config(mocks.config);

        return plugin.cypher('WRONG-QUERY')
            .should.not.be.fulfilled
            ;
    });
});
