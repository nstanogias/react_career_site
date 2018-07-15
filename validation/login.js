const Validator = require('validator');
const _ = require('underscore');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = _.isEmpty(data.email) ? '' : data.email;
  data.password = _.isEmpty(data.password) ? '' : data.password;

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
}