require('dotenv').config();

const express = require('express');

const app = express();

// injections
const injections = require('./injections');

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
);

app.get('/', (req, res) => {
  return res.send({ messages: 'Hello this is a messenger bot' });
});

injections.forEach((useCase) => {
  useCase.execute(app);
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
