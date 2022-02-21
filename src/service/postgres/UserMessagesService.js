const pool = require('./pool');

class UserMessagesService {
  constructor() {
    this._pool = pool;
  }

  async addMessageToUser(userId, messages) {
    const query = {
      text: 'INSERT INTO usermessage VALUES ($1, $2)',
      values: [userId, messages],
    };

    await this._pool.query(query);
  }

  async getMessages() {
    const query = 'SELECT * FROM usermessage';
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getMessagesByUserId(userId) {
    const query = {
      text: 'SELECT message FROM usermessage WHERE user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = UserMessagesService;
