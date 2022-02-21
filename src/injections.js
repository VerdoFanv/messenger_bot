/* istanbul ignore file */
// api
const webhook = require('./api/webhook');
const messages = require('./api/messages');
const users = require('./api/users');

const useCaseContainer = [
  webhook,
  messages,
  users,
];

module.exports = useCaseContainer;
