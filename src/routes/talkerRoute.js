const { Router } = require('express');
const randomToken = require('random-token');
const { writeFile } = require('fs').promises;
const {
  getAllTalkers,
  pushTalker,
  createObject,
  talkerName,
  talkerRate,
  talkerDate,
} = require('../utils/functions');
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
  validateQueryRoute,
  validateQueryDate,
} = require('../middlewares/talkerMiddleware');

const talkRoute = Router();

talkRoute.get('/search', validateTokenExists, validateToken,
  validateQueryRoute, validateQueryDate, async (req, res) => {
  const { q, rate, date } = req.query;
  let allTalkers = await getAllTalkers();

  if (q) allTalkers = talkerName(q, allTalkers);
  if (rate) allTalkers = talkerRate(rate, allTalkers);
  if (date) allTalkers = talkerDate(date, allTalkers);

  return res.status(200).json(allTalkers);
});

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

  const newTalker = createObject(req.body, allTalkers.length + 1);

  const lastTalker = await pushTalker(newTalker);

  res.status(201).json(lastTalker);
});

talkRoute.put('/:id', validateTokenExists, validateToken, validateNameNotNull, validateNameLength,
validateAgeNotNull, validateAge, validateTalkNotNull, validateWatchedNotNull, validateWatchedFormat,
validateRateNotNull, validateRate, async (req, res) => {
  req.headers.authorization = randomToken(16);
  const { id } = req.params;
  const allTalkers = await getAllTalkers();
  const filteredTalker = allTalkers.find((talker) => talker.id === +id);

  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const newTalker = createObject(req.body, +id);

  pushTalker(newTalker);
  
  res.status(200).json(newTalker);
});

talkRoute.delete('/:id', validateTokenExists, validateToken, async (req, res) => {
  req.headers.authorization = randomToken(16);
  const { id } = req.params;
  const allTalkers = await getAllTalkers();
  const deletedTalker = allTalkers.find((talker) => talker.id === +id);
  const newListTalkers = allTalkers.splice(deletedTalker, 1);

  writeFile('src/talker.json', JSON.stringify(newListTalkers, null, 2));
  
  res.status(204).json(deletedTalker);
});

module.exports = talkRoute;