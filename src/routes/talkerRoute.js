const { Router } = require('express');
const randomToken = require('random-token');
const { getAllTalkers, pushTalker } = require('../utils/functions');
const {
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
} = require('../middlewares/talkerMiddleware');

const talkRoute = Router();

talkRoute.get('/', async (_req, res) => {
  const allTalkers = await getAllTalkers();
  return res.status(200).json(allTalkers);
});

talkRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getAllTalkers();
  const filteredTalker = allTalkers.find((talker) => talker.id === +id);

  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(filteredTalker);
});

talkRoute.post('/', validateTokenExists, validateToken, validateNameNotNull, validateNameLength,
validateAgeNotNull, validateAge, validateTalkNotNull, validateWatchedNotNull, validateWatchedFormat,
validateRateNotNull, validateRate, async (req, res) => {
  req.headers.authorization = randomToken(16);
  const allTalkers = await getAllTalkers();
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name,
    age,
    id: allTalkers.length += 1,
    talk: {
      watchedAt,
      rate,
    },
  };

  pushTalker(newTalker);

  res.status(201).json(newTalker);
});

module.exports = talkRoute;