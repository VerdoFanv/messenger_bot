const autoBind = require('auto-bind');
const routes = require('./routes');
const WebHookHandler = require('./handler');
const MessageHandler = require('./messages/MessageHandler');
const UsersService = require('../../service/postgres/UsersService');
const UserMessagesService = require('../../service/postgres/UserMessagesService');

const webhook = {
  execute(app) {
    const usersService = new UsersService();
    const userMessagesService = new UserMessagesService();

    const messageHandler = new MessageHandler({
      usersService,
      userMessagesService,
      autoBind,
    });
    const webHookHandler = new WebHookHandler(autoBind, messageHandler);
    routes(app, webHookHandler);
  },
};

module.exports = webhook;
