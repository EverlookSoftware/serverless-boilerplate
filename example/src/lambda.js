import awsExpress from 'aws-serverless-express';

import app from './app';

/**
 * Creat the server object
 */
const server = awsExpress.createServer(app);

/**
 * Adds the adapter for express.
 * This allows you to write 'express-like' syntax for your lambdas.
 * @param {Object} event - Lambda event object
 * @param {Object} context - Lambda context object
 * @returns {void}
 */
exports.handler = (event, context) => awsExpress.proxy(server, event, context);
