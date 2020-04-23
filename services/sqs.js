const AWS = require('aws-sdk');

const {
  QUEUE_URL,
} = process.env;

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

const send = data => sqs.sendMessage({
  MessageBody: JSON.stringify(data),
  QueueUrl: QUEUE_URL,
}).promise();

module.exports = {
  send,
};
