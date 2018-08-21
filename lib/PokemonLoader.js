'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAll = exports.load = exports.getLoader = undefined;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _graphqlRelay = require('graphql-relay');

var _graphqlMongooseLoader = require('@entria/graphql-mongoose-loader');

var _mongoose = require('mongoose');

var _PokemonModel = require('./PokemonModel');

var _PokemonModel2 = _interopRequireDefault(_PokemonModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pokemon = function Pokemon(data) {
  _classCallCheck(this, Pokemon);

  this.id = data.id;
  this.name = data.name;
  this.number = data.number;
  this.height = data.height;
  this.weight = data.weight;
  this.imageUrl = data.imageUrl;
  this.types = data.types;
};

exports.default = Pokemon;
var getLoader = exports.getLoader = function getLoader() {
  return new _dataloader2.default(function (ids) {
    return (0, _graphqlMongooseLoader.mongooseLoader)(_PokemonModel2.default, ids);
  });
};

var load = exports.load = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var id = arguments[1];
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (id) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', null);

          case 2:
            data = void 0;
            _context.prev = 3;
            _context.next = 6;
            return _PokemonModel2.default.findOne({ _id: id });

          case 6:
            data = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            return _context.abrupt('return', null);

          case 12:
            return _context.abrupt('return', data ? new Pokemon(data) : null);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 9]]);
  }));

  return function load() {
    return _ref.apply(this, arguments);
  };
}();

var loadAll = exports.loadAll = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {
    var Pokemon;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            Pokemon = _PokemonModel2.default.find({});
            return _context2.abrupt('return', (0, _graphqlMongooseLoader.connectionFromMongoCursor)({ cursor: Pokemon, context: {}, args: args, loader: load }));

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadAll(_x2) {
    return _ref2.apply(this, arguments);
  };
}();