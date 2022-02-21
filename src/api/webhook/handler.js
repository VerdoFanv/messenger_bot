require('dotenv').config();

class WebHookHandler {
  constructor(autoBind, messageHandler) {
    this.messageHandler = messageHandler;
    autoBind(this);
  }

  verifyWebhookHandler(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('webhook diverifikasi');
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403).send({ message: 'anda tidak dapat mengakses' });
      }
    }
  }

  postWebHookHandler(req, res) {
    const body = req.body;

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        const webhookEvent = entry.messaging[0];
        const senderPsid = webhookEvent.sender.id;

        if (webhookEvent.message) {
          this.messageHandler.replyTheMessage(senderPsid, webhookEvent.message);
        }
      });

      return res.status(200).send('EVENT_RECEIVED');
    } else {
      return res.sendStatus(404);
    }
  }
}

module.exports = WebHookHandler;
