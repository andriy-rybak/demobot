const { send: queue } = require('./services/sqs');
const { send: echo } = require('./services/telegram');
const lex = require('./services/lex');
const { parseMessage } = require('./services/utils');

const handleMsg = async (message) => {
  const { chatId, messageId } = parseMessage(message);

  await echo(chatId, `Handling message: ${messageId}`);

  lex.handle(message);

  await echo(chatId, `Message handled: ${messageId}`);
}

// SQS based handler
const http_handler = async (event) => {
  const { message } = JSON.parse(event.body);

  const { chatId, text } = parseMessage(message);

  await echo(chatId, `Sending message to queue: ${text}`);
  await queue(message);
  await echo(chatId, `Message sent to queue: ${text}`);

  return { statusCode: 200 };
};

// SQS based handler
const queue_handler = async (event) => {
  const prepare = ({ body }) => JSON.parse(body);

  const messages = event.Records
    .map(prepare)
    .map(handleMsg);

  await Promise.all(messages);
};

// Step Functions based handler
const stepfn_handler = async (event) => {
  const { message } = event;

  await handleMsg(message);
};

module.exports = {
  http_handler,
  queue_handler,
  stepfn_handler,
};
