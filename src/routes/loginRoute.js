const { Router } = require('express');
const randomToken = require('random-token');
const { 
  validateEmailNotNull,
  validateEmail,
  validatePasswordNotNull,
  validatePassword,
} = require('../middlewares/loginMiddleware');

const loginRoute = Router();

loginRoute.post('/', validateEmailNotNull, validateEmail, 
validatePasswordNotNull, validatePassword, (_req, res) => {
  const token = randomToken(16);

  res.status(200).json({ token });
});

module.exports = loginRoute;