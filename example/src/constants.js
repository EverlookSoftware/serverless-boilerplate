import _ from 'lodash';

/**
 * All process.env variables will be stored in here.
 * Anywhere in your app that you need to reference process.env,
 * just import from constants.
 *
 * @example
 *
 * import constants from '../constants';
 *
 * console.log(constants.DYNAMO_TABLE_NAME);
 */
export default Object.freeze(_.defaults({}, process.env, {
  // Exmaple:
  // foo: 'bar,
}));
