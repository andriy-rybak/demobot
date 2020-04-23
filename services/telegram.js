const request = require('request-promise');

const {
  TELEGRAM_TOKEN,
} = process.env;

const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

const send = (chat_id, text) => request({
  method: 'GET',
  uri: TELEGRAM_URL,
  qs: {
    chat_id,
    text,
  },
});

module.exports = {
  send,
};
