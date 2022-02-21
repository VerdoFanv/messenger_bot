const routes = (app, handler) => {
  app.get('/summary', handler.getUserMessagesHandler);
};

module.exports = routes;
