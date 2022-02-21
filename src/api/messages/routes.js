const routes = (app, handler) => {
  app.get('/messages', handler.getMessagesHandler);
  app.get('/messages/:id', handler.getMessageByUserIdHandler);
};

module.exports = routes;
