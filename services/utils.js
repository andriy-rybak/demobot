const parseMessage = ({
  chat: { id: chatId },
  text,
  message_id: messageId,
}) => ({ chatId, text, messageId });

const delay = val => new Promise((resolve) => setTimeout(resolve, val));

module.exports = {
  parseMessage,
  delay,
}
