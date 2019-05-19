import uuid from 'uuid';
import dynamoose from 'dynamoose';

import constants from '../../constants';

/**
 * Schema for below table
 */
const Schema = new dynamoose.Schema({
  email: {
    type: String,
    trim: true,
    index: {
      global: true,
      name: 'email-index',
      project: true,
      throughput: 5,
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    hashKey: true,
    default: [uuid.v4()],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

/**
 * Table definition
 */
export default dynamoose.model(constants.DYNAMO_TABLE_NAME, Schema);
