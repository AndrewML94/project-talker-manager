const express = require('express');
const { talkRoute, loginRoute } = require('./routes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('O pai tá online!!!!');
});
