export const handler = (event, context, callback) => {
  console.log('event triggered', event);

  return callback(null, { success: true });
}
