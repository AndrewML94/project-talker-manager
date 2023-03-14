const validateEmailNotNull = (req, res, next) => {
  const requireProperties = ['email'];

  if (requireProperties.every((property) => property in req.body)) {
    next();
  }

  res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validator = /\S+@\S+\.\S+/;

  if (validator.test(email)) {
    next();
  }

  res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const validatePasswordNotNull = (req, res, next) => {
  const requireProperties = ['password'];

  if (requireProperties.every((property) => property in req.body)) {
    next();
  }

  res.status(400).json({ message: 'O campo "password" é obrigatório' });
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length >= 6) {
    next();
  }

  res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
  validateEmailNotNull,
  validateEmail,
  validatePasswordNotNull,
  validatePassword,
};