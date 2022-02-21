const autoBind = require('auto-bind');
const routes = require('./routes');
const UsersHandler = require('./handler');
const UsersService = require('../../service/postgres/UsersService');

const users = {
  execute(app) {
    const usersService = new UsersService();
    const usersHandler = new UsersHandler(usersService, autoBind);

    routes(app, usersHandler);
  },
};

module.exports = users;
