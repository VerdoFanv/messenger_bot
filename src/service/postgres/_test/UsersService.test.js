const UsersService = require('../UsersService');
const UsersTableTestHelper = require('../../../../test/UsersTableTestHelper');
const pool = require('../pool');

describe('Users Services', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addUser function', () => {
    it('should be able to add a new user', async () => {
      const usersService = new UsersService();
      const addedUser = await usersService.addUser('user-123');

      const getUser = await UsersTableTestHelper.findUsersById(addedUser);
      expect(getUser).toHaveLength(1);
    });
  });

  describe('getUsersMessage function', () => {
    it('should get user message correctly', async () => {
      const usersService = new UsersService();
      const addedUser = await usersService.addUser('user-123');

      const getUserMessage = await usersService.getUsersMessage(addedUser);

      expect(getUserMessage[0].id).toBeDefined();
      expect(getUserMessage[0].username).toBeDefined();
      expect(getUserMessage[0].message).toBeDefined();
    });
  });
});
