const { Router } = require('express');
const randomToken = require('random-token');

const loginRoute = Router();

loginRoute.post('/', (_req, res) => {
  const token = randomToken(16);

  res.status(200).json({ token });
});

module.exports = loginRoute;