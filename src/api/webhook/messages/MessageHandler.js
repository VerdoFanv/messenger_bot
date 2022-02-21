require('dotenv').config();
const request = require('request');
const moment = require('moment');

class MessageHandler {
  constructor({ usersService, userMessagesService, autoBind }) {
    this._request = request;
    this._usersService = usersService;
    this._userMessagesService = userMessagesService;

    this.session1 = false;
    this.session2 = false;
    this.session3 = false;

    this.userBirthday = '';
    this.userIdBySession = '';
    this.userMessages = [];

    autoBind(this);
  }

  async replyTheMessage(senderPsid, receivedMessage) {
    if (receivedMessage.text) {
      if (this.session1 === true && this.session2 === false && this.session3 === false) {
        await this._askVer1(senderPsid, receivedMessage);
      } else if (this.session1 === true && this.session2 === true && this.session3 === false) {
        const isDate = moment(receivedMessage.text, 'YYYY-MM-DD', true).isValid();

        if (isDate) {
          this._askVer2(senderPsid, receivedMessage);
        } else {
          await this._askVer1(senderPsid, receivedMessage);
        }
      } else if (this.session1 && this.session2 && this.session3) {
        this.userMessages.push(receivedMessage.text);

        if (receivedMessage.text === 'yes' || receivedMessage.text === 'yeah' || receivedMessage.text === 'yup') {
          this.userMessages.push(receivedMessage.text);
          await this._userMessagesService.addMessageToUser(this.userIdBySession, this.userMessages);

          const response = {
            'text': this._calculateHowDaysTillNextBirthday(this.userBirthday),
          };

          this.session1 = false;
          this.session2 = false;
          this.session3 = false;
          this.userMessages = [];

          this._callSendAPI(senderPsid, response);
        } else if (receivedMessage.text === 'no' || receivedMessage.text === 'nah') {
          this.userMessages.push(receivedMessage.text);
          await this._userMessagesService.addMessageToUser(this.userIdBySession, this.userMessages);

          const response = {
            'text': 'Goodbye ...',
          };

          this.session1 = false;
          this.session2 = false;
          this.session3 = false;
          this.userMessages = [];

          this._callSendAPI(senderPsid, response);
        } else {
          this._askVer2(senderPsid, receivedMessage);
        }
      } else {
        const response = {
          'text': 'Please type your firstname ...',
        };

        this.session1 = true;
        this._callSendAPI(senderPsid, response);
      }
    }
  }

  async _askVer1(senderPsid, receivedMessage) {
    const userId = await this._usersService.addUser(receivedMessage.text);
    this.userIdBySession = userId;
    this.userMessages.push(receivedMessage.text);

    const response = {
      'text': 'Please type your birthday in "YYYY-MM-DD" format.\n\ne.g 2000-02-20',
    };

    this.session2 = true;
    this._callSendAPI(senderPsid, response);
  }

  _askVer2(senderPsid, receivedMessage) {
    this.userMessages.push(receivedMessage.text);
    this.userBirthday = receivedMessage.text;
    const response = {
      'text': 'Are you wants to know, how many days till to your next birthday ?',
    };

    this.session3 = true;
    this._callSendAPI(senderPsid, response);
  }

  _callSendAPI(senderPsid, res) {
    const requestBody = {
      'recipient': {
        'id': senderPsid,
      },
      'message': res,
    };

    this._request({
      'uri': `${process.env.BASE_GRAPH_URL}/me/messages`,
      'qs': { 'access_token': process.env.PAGE_ACCESS_TOKEN },
      'method': 'POST',
      'json': requestBody,
    }, (err) => {
      if (!err) {
        console.log('Message sent!');
      } else {
        console.error(`Unable to send a message: ${err}`);
      }
    });
  }

  _calculateHowDaysTillNextBirthday(date) {
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

    return `There are ${dateDifferences} days left until your next birthday`;
  }
}

module.exports = MessageHandler;
