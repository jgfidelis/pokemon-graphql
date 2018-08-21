'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PokemonConnection = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _CustomConnectionType = require('./CustomConnectionType');

var PokemonType = new _graphql.GraphQLObjectType({
  name: 'Pokemon',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Pokemon'),
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      number: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        resolve: function resolve(obj) {
          return obj.number;
        }
      },
      imageUrl: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        resolve: function resolve(obj) {
          return obj.imageUrl;
        }
      },
      weight: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        resolve: function resolve(obj) {
          return obj.weight;
        }
      },
      height: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        resolve: function resolve(obj) {
          return obj.height;
        }
      },
      types: {
        type: new _graphql.GraphQLList(_graphql.GraphQLString),
        resolve: function resolve(obj) {
          return obj.types;
        }
      }
    };
  }
});

var PokemonConnection = exports.PokemonConnection = (0, _CustomConnectionType.connectionDefinitions)({
  name: 'Pokemon',
  nodeType: PokemonType
});

exports.default = PokemonType;