'use strict';

// Default error class
const codes = {
  'VALIDATION': 400,
  'MODULE_NOT_FOUND': 404,
  'MODULE_CONFLICT': 400
};

const errorFactory = require('.');
module.exports = errorFactory('Internal', codes);