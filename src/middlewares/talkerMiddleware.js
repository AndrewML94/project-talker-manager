const validateTokenExists = (req, res, next) => {
  if (req.headers.authorization) return next();
  
  return res.status(401).json({ message: 'Token não encontrado' }); 
};

const validateToken = (req, res, next) => {
  if (req.headers.authorization.length === 16) return next();
  
  return res.status(401).json({ message: 'Token inválido' }); 
};

const validateNameNotNull = (req, res, next) => {
  const requireProperties = ['name'];

  if (requireProperties.every((property) => property in req.body)) {
    return next();
  }

  return res.status(400).json({ message: 'O campo "name" é obrigatório' });
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;

  if (name.length >= 3) return next();

  return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
};

const validateAgeNotNull = (req, res, next) => {
  const requireProperties = ['age'];

  if (requireProperties.every((property) => property in req.body)) {
    return next();
  }

  return res.status(400).json({ message: 'O campo "age" é obrigatório' });
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (age > 18 && Number.isInteger(age)) return next();

  return res.status(400).json({
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
  });
};

const validateTalkNotNull = (req, res, next) => {
  const requireProperties = ['talk'];

  if (requireProperties.every((property) => property in req.body
    && typeof requireProperties === 'object' && requireProperties)) {
    return next();
  }

  return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const validateWatchedNotNull = (req, res, next) => {
  const requireProperties = ['watchedAt'];

  if (requireProperties.every((property) => property in req.body.talk)) {
    return next();
  }

  return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
};

const validateWatchedFormat = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const validator = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (validator.test(watchedAt)) return next();

  return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
};

const validateRateNotNull = (req, res, next) => {
  const requireProperties = ['rate'];

  if (requireProperties.every((property) => property in req.body.talk)) {
    return next();
  }

  return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate >= 1 && rate <= 5 && Number.isInteger(rate)) return next();

  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
};

const validateQueryRoute = (req, res, next) => {
  const { rate } = req.query;

  if (!rate) return next();
  if (+rate >= 1 && +rate <= 5 && Number.isInteger(+rate)) return next();

  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
};

const validateQueryDate = (req, res, next) => {
  const { date } = req.query;
  const validator = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!date) return next();
  if (validator.test(date)) return next();

  return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
};

module.exports = {
  validateTokenExists,
  validateToken,
  validateNameNotNull,
  validateNameLength,
  validateAgeNotNull,
  validateAge,
  validateTalkNotNull,
  validateWatchedNotNull,
  validateWatchedFormat,
  validateRateNotNull,
  validateRate,
  validateQueryRoute,
  validateQueryDate,
};