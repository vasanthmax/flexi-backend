// src/routes/authentication/validation.js

const Joi = require('joi');
const STATUS_CODES = require('../../constants/statusCodes');

const validationOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown properties
  stripUnknown: true, // remove unknown properties
};

// Validation for email signup
function validateEmailSignup(req, res, next) {
  const emailSignupFilter = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = emailSignupFilter.validate(
    req.body,
    validationOptions
  );
  if (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
}

// Validation for email login
function validateEmailLogin(req, res, next) {
  const emailLoginFilter = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = emailLoginFilter.validate(
    req.body,
    validationOptions
  );
  if (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
}

// Validation for Google signin
function validateGoogleSignin(req, res, next) {
  const googleLoginFilter = Joi.object({
    idToken: Joi.string().min(800).required(),
  });

  const { error, value } = googleLoginFilter.validate(
    req.body,
    validationOptions
  );
  if (error) {
    res.status(STATUS_CODES.BAD_REQUEST);
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
}

// Validation for Facebook signin
function validateFacebookSignin(req, res, next) {
  const facebookLoginFilter = Joi.object({
    accessToken: Joi.string().min(800).required(),
  });

  const { error, value } = facebookLoginFilter.validate(
    req.body,
    validationOptions
  );
  if (error) {
    res.status(STATUS_CODES.BAD_REQUEST);
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    req.body = value;
    next();
  }
}

function validateResetPassword(req, res, next) {
  const emailLoginFilter = Joi.object({
    newPass: Joi.string().min(6).required(),
    resetink: Joi.string().required(),
  });

  const { error, value } = emailLoginFilter.validate(
    req.body,
    validationOptions
  );
  if (error) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
}

module.exports = {
  validateEmailLogin,
  validateEmailSignup,
  validateFacebookSignin,
  validateGoogleSignin,
  validateResetPassword,
};
