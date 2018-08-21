'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionArgs = exports.backwardConnectionArgs = exports.forwardConnectionArgs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @flow


exports.connectionDefinitions = connectionDefinitions;

var _graphql = require('graphql');

// import type { GraphQLFieldConfigArgumentMap, GraphQLFieldConfigMap, GraphQLFieldResolver, Thunk } from 'graphql';

var forwardConnectionArgs = exports.forwardConnectionArgs = {
  after: {
    type: _graphql.GraphQLString
  },
  first: {
    type: _graphql.GraphQLInt
  }
};

var backwardConnectionArgs = exports.backwardConnectionArgs = {
  before: {
    type: _graphql.GraphQLString
  },
  last: {
    type: _graphql.GraphQLInt
  }
};

var connectionArgs = exports.connectionArgs = _extends({}, forwardConnectionArgs, backwardConnectionArgs);

// type ConnectionConfig = {
//   name?: ?string,
//   nodeType: GraphQLObjectType,
//   resolveNode?: ?GraphQLFieldResolver<*, *>,
//   resolveCursor?: ?GraphQLFieldResolver<*, *>,
//   edgeFields?: ?Thunk<GraphQLFieldConfigMap<*, *>>,
//   connectionFields?: ?Thunk<GraphQLFieldConfigMap<*, *>>,
// };

// type GraphQLConnectionDefinitions = {
//   edgeType: GraphQLObjectType,
//   connectionType: GraphQLObjectType,
// };

var pageInfoType = new _graphql.GraphQLObjectType({
  name: 'PageInfoExtended',
  description: 'Information about pagination in a connection.',
  fields: function fields() {
    return {
      hasNextPage: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
        description: 'When paginating forwards, are there more items?'
      },
      hasPreviousPage: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLBoolean),
        description: 'When paginating backwards, are there more items?'
      },
      startCursor: {
        type: _graphql.GraphQLString,
        description: 'When paginating backwards, the cursor to continue.'
      },
      endCursor: {
        type: _graphql.GraphQLString,
        description: 'When paginating forwards, the cursor to continue.'
      }
    };
  }
});

function resolveMaybeThunk(thingOrThunk) {
  return typeof thingOrThunk === 'function' ? thingOrThunk() : thingOrThunk;
}

function connectionDefinitions(config) {
  var nodeType = config.nodeType,
      resolveCursor = config.resolveCursor,
      resolveNode = config.resolveNode;

  var name = config.name || nodeType.name;
  var edgeFields = config.edgeFields || {};
  var connectionFields = config.connectionFields || {};

  var edgeType = new _graphql.GraphQLObjectType({
    name: name + 'Edge',
    description: 'An edge in a connection.',
    fields: function fields() {
      return _extends({
        node: {
          type: nodeType,
          resolve: resolveNode,
          description: 'The item at the end of the edge'
        },
        cursor: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
          resolve: resolveCursor,
          description: 'A cursor for use in pagination'
        }
      }, resolveMaybeThunk(edgeFields));
    }
  });

  var connectionType = new _graphql.GraphQLObjectType({
    name: name + 'Connection',
    description: 'A connection to a list of items.',
    fields: function fields() {
      return _extends({
        count: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
          description: 'Number of items in this connection'
        },
        totalCount: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
          resolve: function resolve(connection) {
            return connection.count;
          },
          description: 'A count of the total number of objects in this connection, ignoring pagination.\n  This allows a client to fetch the first five objects by passing "5" as the\n  argument to "first", then fetch the total count so it could display "5 of 83",\n  for example.'
        },
        startCursorOffset: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
          description: 'Offset from start'
        },
        endCursorOffset: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
          description: 'Offset till end'
        },
        pageInfo: {
          type: new _graphql.GraphQLNonNull(pageInfoType),
          description: 'Information to aid in pagination.'
        },
        edges: {
          type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(edgeType)),
          description: 'A list of edges.'
        }
      }, resolveMaybeThunk(connectionFields));
    }
  });

  return { edgeType: edgeType, connectionType: connectionType };
}