class MessagesHandler {
  constructor(userMessagesService, autoBind) {
    this._userMessagesService = userMessagesService;

    autoBind(this);
  }

  async getMessagesHandler(req, res) {
    const allMessage = await this._userMessagesService.getMessages();
    const response = {
      status: 'success',
      data: allMessage,
    };

    return res.status(200).send(response);
  }

  async getMessageByUserIdHandler(req, res) {
    const id = req.params.id;
    const message = await this._userMessagesService.getMessagesByUserId(id);
    const response = {
      status: 'success',
      data: message,
    };

    return res.status(201).send(response);
  }
}

module.exports = MessagesHandler;
