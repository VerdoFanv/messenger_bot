const autoBind = require('auto-bind');
const moment = require('moment');
const MessageHandler = require('../MessageHandler');
const usersService = require('../../../../service/postgres/UsersService');
const userMessagesService = require('../../../../service/postgres/UserMessagesService');

describe('MessageHandler class', () => {
  describe('_calculateHowDaysTillNextBirthday function', () => {
    const calculateHowDaysTillNextBirthday = (date) => {
      const isDate = moment(date, 'YYYY-MM-DD', true).isValid();
      if (isDate) {
        const yearNow = moment().format('YYYY');
        const dateNow = moment().format('YYYY-MM-DD');
        const monthAndDayNow = moment().format('MM-DD');

        const sliceYear = date.slice(5, 10);
        let concateDate;
        if (sliceYear > monthAndDayNow) {
          concateDate = `${(Number(yearNow))}-${sliceYear}`;
        } else {
          concateDate = `${(Number(yearNow) + 1)}-${sliceYear}`;
        }

        const dateA = moment(dateNow);
        const dateB = moment(concateDate);
        const dateDifferences = dateB.diff(dateA, 'days');

        return dateDifferences;
      } else {
        return 0;
      }
    };

    it('should return 0 when given not date format', () => {
      const messageHandler = new MessageHandler({ usersService, userMessagesService, autoBind });

      const currentBirtday = 'hello';

      expect(messageHandler._calculateHowDaysTillNextBirthday(currentBirtday)).toEqual(0);
    });

    it('should be calculate the number of user next birtday with correct message', () => {
      const messageHandler = new MessageHandler({ usersService, userMessagesService, autoBind });

      const currentBirtday1 = '2002-06-15';
      const currentBirtday2 = '1998-01-10';

      expect(messageHandler._calculateHowDaysTillNextBirthday(currentBirtday1)).toEqual(calculateHowDaysTillNextBirthday(currentBirtday1));
      expect(messageHandler._calculateHowDaysTillNextBirthday(currentBirtday2)).toEqual(calculateHowDaysTillNextBirthday(currentBirtday2));
    });
  });
});
