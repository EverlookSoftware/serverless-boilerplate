/**
 * Just a list of helpful utilities when writing your code
 */

import _ from 'lodash';
import debug from 'debug';
import Validator from 'validatorjs';

/**
 * Simple logger.. suggest switching this for something more robust like bunyan.
 */
const log = debug('api:utils');

/**
 * Throws an error with a given code & detail.
 * @param {Object<{ detail, type, code }>} params = Error details
 * @returns {Error} - Thrown error with code.
 */
const throwErrorWithCode = ({ detail = '', type = 'Bad Request', code = 500 }) => (customError = detail) => {
  throw Object.assign(new Error(), {
    detail: customError,
    code,
    type,
  });
};

/**
 * Throws a "Bad request" 400 error
 */
export const throwHttpBadRequest = throwErrorWithCode({
  detail: 'An error occurred while processing your request.',
  code: 400,
  type: 'Bad request',
});

/**
 * Throws a 404 "Not Found" error.
 */
export const throwHttpNotFound = throwErrorWithCode({
  detail: 'An error occurred while processing your request.',
  code: 404,
  type: 'Entity not found',
});

/**
 * Throws a 409  "Already Exists" error.
 */
export const throwHttpAlreadyExists = throwErrorWithCode({
  detail: 'An error occurred while processing your request.',
  code: 409,
  type: 'Entity already exists',
});

/**
 * Validates a request body by a given schema.
 * Leverages 'validatorjs' to do validations.
 * https://github.com/skaterdav85/validatorjs
 *
 * @param {Object} schema - The schema object.
 * @returns {*} - Value from whatever is returned from fn
 */
export const validateBodyWithSchema = schema => fn => (req, res) => {
  _.forEach(schema, (value, key) => {
    const rule = { [key]: _.get(schema, key, '') };

    const validation = new Validator({
      [key]: _.get(req.body, key, ''),
    }, rule);

    if (validation.fails()) {
      res.send(throwHttpBadRequest(validation.errors.get(key)[0]));
    }
  });

  return fn(req, res);
};

/**
 * Catches an error up top and responds with appropriate error code & message.
 * Formats the error response.
 *
 * @param {Function} fn - The route controller to wrap & catch errors for.
 * @returns {Promise<void>} - Voided promise from async function
 */
export const withErrorHandling = fn => async (req, res) => {
  try {
    await fn(req, res);
  } catch (e) {
    log('An error occurred', e);

    const code = e.code || 500;

    res.status(code).send({
      type: e.type,
      code,
      detail: e.detail,
    });
  }
};

/**
 * Checks to see if the body matches the schema,
 * throws error if something in the body does not exist in the schema.
 *
 * @param {Object} schema - The schema to validate against.
 * @returns {*} - Whatever is returned from envoking 'fn'.
 */
export const withUpdateValidation = schema => fn => (req, res) => {
  const { body } = req;

  _.forEach(body, (value, key) => {
    if (!schema[key]) {
      res.send(throwHttpBadRequest(`Update with field ${key} is not supported.`));
    }

    const rule = { [key]: _.get(schema, key, '') };

    const validation = new Validator({
      [key]: value,
    }, rule);

    if (validation.fails()) {
      res.send(throwHttpBadRequest(validation.errors.get(key)[0]));
    }
  });

  return fn(req, res);
};
