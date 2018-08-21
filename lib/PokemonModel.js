'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  types: {
    type: [String],
    required: true
  }
}, {
  collection: 'Pokemon',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

exports.default = _mongoose2.default.model('Pokemon', Schema);