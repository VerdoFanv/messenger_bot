const autoBind = require('auto-bind');
const UserMessagesService = require('../../service/postgres/UserMessagesService');
const MessagesHandler = require('./handler');
const routes = require('./routes');

const messages = {
  execute(app) {
    const userMessagesService = new UserMessagesService();
    const messagesHandler = new MessagesHandler(userMessagesService, autoBind);

    routes(app, messagesHandler);
  },
};

module.exports = messages;
