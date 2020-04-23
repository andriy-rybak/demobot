const { delay } = require('./utils');

const handle = async () => {
  await delay(5000);
}

module.exports = {
  handle,
}
