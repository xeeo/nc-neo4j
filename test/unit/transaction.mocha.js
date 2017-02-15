'use strict';

require('../lib/chai');

let Plugin      = require('../../');
let Hoek        = require('hoek');

let mocks       = require('../mocks');

describe('Neo4J.transaction', function() {
    before(function() {
        let plugin = new Plugin();

        plugin.config(mocks.config);

        return plugin.cypher('MATCH (n:Test) DELETE n');
    });

    it('should run query', function() {
        let plugin = new Plugin();

        let statements = {
            statements: [
                {
                    statement   : 'CREATE (n:Car:Test {props}) RETURN n',
                    parameters  : {
                        props: {
                            make: 'Honda Civic',
                            year: 2015
                        }
                    }
                },
                {
                    statement   : 'CREATE (n:Car:Test {props}) RETURN n',
                    parameters  : {
                        props: {
                            make: 'Opel Astra',
                            year: 2009
                        }
                    }
                }
            ]
        };

        plugin.config(mocks.config);

        return plugin.transaction(statements)
            .then(function(result) {
                result[0].data[0].row[0].should.deep.equal(statements.statements[0].parameters.props);
            });
    });
});
