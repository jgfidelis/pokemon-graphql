'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _graphqlMongooseLoader = require('@entria/graphql-mongoose-loader');

var _PokemonType = require('./PokemonType');

var _PokemonType2 = _interopRequireDefault(_PokemonType);

var _PokemonModel = require('./PokemonModel');

var _PokemonModel2 = _interopRequireDefault(_PokemonModel);

var _CustomConnectionType = require('./CustomConnectionType');

var _PokemonLoader = require('./PokemonLoader');

var PokemonLoader = _interopRequireWildcard(_PokemonLoader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      allPokemon: {
        type: new _graphql.GraphQLList(_PokemonType2.default),
        resolve: function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _PokemonModel2.default.find({});

                  case 2:
                    return _context.abrupt('return', _context.sent);

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function resolve() {
            return _ref.apply(this, arguments);
          };
        }()
      },
      paginated: {
        // type: SessionTokenConnection.connectionType
        type: _PokemonType.PokemonConnection.connectionType,
        args: _CustomConnectionType.connectionArgs,
        resolve: function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, args) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    console.log('teste args: ', obj, args);
                    _context2.next = 3;
                    return PokemonLoader.loadAll(args);

                  case 3:
                    return _context2.abrupt('return', _context2.sent);

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          return function resolve(_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }()
      }
    };
  }
});

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: QueryType
});