const routes = (app, handler) => {
  app.get('/webhook', handler.verifyWebhookHandler);
  app.post('/webhook', handler.postWebHookHandler);
};

module.exports = routes;
