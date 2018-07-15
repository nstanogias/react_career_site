const Validator = require('validator');
const _ = require('underscore');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.nickname = !_.isEmpty(data.nickname) ? data.nickname : '';
  data.status = !_.isEmpty(data.status) ? data.status : '';
  data.skills = !_.isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.nickname, { min: 2, max: 40 })) {
    errors.nickname = 'nickname needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.nickname)) {
    errors.nickname = 'Profile nickname is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
