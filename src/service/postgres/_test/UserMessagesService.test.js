const pool = require('../pool');
const UserMessageTableTestHelper = require('../../../../test/UserMessageTableTestHelper');
const UsersTableTestHelper = require('../../../../test/UsersTableTestHelper');
const UserMessageService = require('../UserMessagesService');
const NotFoundError = require('../../../exceptions/NotFoundError');

describe('User Messages Services', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await UserMessageTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addMessageToUser function', () => {
    it('should add message correctyly', async () => {
      const userMessageData = {
        user_id: 'user-123',
        message: ['hello world!'],
      };
      await UsersTableTestHelper.addUser({ username: 'testing user' });
      const userMessageService = new UserMessageService();

      await userMessageService.addMessageToUser(userMessageData.user_id, userMessageData.message);

      expect(await UserMessageTableTestHelper.findUserMessageByUserId(userMessageData.user_id)).toStrictEqual(userMessageData);
    });
  });

  describe('getMessages function', () => {
    it('should be able to get all of user message and return correct value', async () => {
      const userMessageData = {
        user_id: 'user-123',
        message: ['hello world!'],
      };

      await UsersTableTestHelper.addUser({ username: 'testing user' });
      await UserMessageTableTestHelper.addUserMessage({ id: userMessageData.user_id, message: userMessageData.message });
      const userMessageService = new UserMessageService();

      const getUserMessage = await userMessageService.getMessages();

      expect(getUserMessage[0]).toStrictEqual(userMessageData);
      expect(getUserMessage[0].message).toHaveLength(1);
    });
  });

  describe('getMessagesByUserId function', () => {
    it('should throw NotFoundError when userId is not found', async () => {
      const userMessageData = {
        user_id: 'user-123',
        message: ['hello world!'],
      };

      await UsersTableTestHelper.addUser({ username: 'testing user' });
      await UserMessageTableTestHelper.addUserMessage({ id: userMessageData.user_id, message: userMessageData.message });
      const userMessageService = new UserMessageService();

      await expect(userMessageService.getMessagesByUserId('xxx')).rejects.toThrowError(NotFoundError);
    });

    it('should be return correct value', async () => {
      const userMessageData = {
        user_id: 'user-123',
        message: ['hello world!'],
      };
      const expectedGetMessage = {
        message: userMessageData.message,
      };

      await UsersTableTestHelper.addUser({ username: 'testing user' });
      await UserMessageTableTestHelper.addUserMessage({ id: userMessageData.user_id, message: userMessageData.message });
      const userMessageService = new UserMessageService();

      expect(await userMessageService.getMessagesByUserId(userMessageData.user_id)).toStrictEqual(expectedGetMessage);
    });
  });
});
