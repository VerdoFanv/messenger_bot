/* istanbul ignore file */
const pool = require('../src/service/postgres/pool');

const UserMessageTableTestHelper = {
  async addUserMessage({
    id = 'user-123', message = 'some messages',
  }) {
    const query = {
      text: 'INSERT INTO usermessage VALUES($1, $2)',
      values: [id, message],
    };

    await pool.query(query);
  },

  async findUserMessageByUserId(id) {
    const query = {
      text: 'SELECT * FROM usermessage WHERE user_id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('DELETE FROM usermessage WHERE 1=1');
  },
};

module.exports = UserMessageTableTestHelper;
