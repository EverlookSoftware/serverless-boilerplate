/**
 * Ignore aws-sdk eslint warning.
 *
 * This is because aws-sdk is fucking huge, and is already included
 * in the lambda runtime for node by default.
 */
// eslint-disable-next-line
import AWS from 'aws-sdk';
import debug from 'debug';

import { withErrorHandling } from '../utils';

/**
 * Logger
 */
const log = debug('api:endpoint-a');

export default withErrorHandling((req, res) => {
  log('Receiving request for lambda endpoint a');

  res.json({ success: true, endpoint: 'a' });
});
