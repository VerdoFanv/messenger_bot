class UsersHandler {
  constructor(usersService, autoBind) {
    this._usersService = usersService;

    autoBind(this);
  }

  async getUserMessagesHandler(req, res) {
    const summary = await this._usersService.getUsersMessage();
    const response = {
      status: 'success',
      data: summary,
    };

    return res.status(201).send(response);
  }
}

module.exports = UsersHandler;
