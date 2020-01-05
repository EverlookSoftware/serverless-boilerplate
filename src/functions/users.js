/**
 * Ignore aws-sdk eslint warning.
 *
 * This is because aws-sdk is fucking huge, and is already included
 * in the lambda runtime for node by default.
 */
// eslint-disable-next-line
import AWS from 'aws-sdk';
import debug from 'debug';

import { withErrorHandling, validateBodyWithSchema } from '../utils';

/**
 * Logger
 */
const log = debug('api:endpoint-b');

/**
 * Creates the schema for your POST endpoint
 * @function
 */
const validatesUserCreation = validateBodyWithSchema({
  id: 'string|required',
  email: 'email|required',
});

/**
 * Supplies the handler for your POST endpoint.
 * @function
 */
const createUserController = validatesUserCreation((req, res) => {
  log('Receiving request for lambda endpoint b', req.body);

  res.json(req.body);
});

/**
 * Exports your route handler, and catches errors at the top level.
 */
export default withErrorHandling(createUserController);
