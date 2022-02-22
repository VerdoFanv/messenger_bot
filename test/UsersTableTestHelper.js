/* istanbul ignore file */
const pool = require('../src/service/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    id = 'user-123', username = 'some user',
  }) {
    const query = {
      text: 'INSERT INTO users VALUES($1, $2)',
      values: [id, username],
    };

    await pool.query(query);
  },

  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

module.exports = UsersTableTestHelper;
