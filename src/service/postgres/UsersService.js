const { nanoid } = require('nanoid');
const pool = require('./pool');

class UsersService {
  constructor() {
    this._pool = pool;
  }

  async addUser(username) {
    const id = `user-${nanoid(12)}`;
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2) RETURNING id',
      values: [id, username],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getUsersMessage() {
    const query = `
      SELECT users.id, users.username, usermessage.message FROM users
      LEFT JOIN usermessage ON usermessage.user_id = users.id
    `;

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = UsersService;
