const { Router } = require('express');
const { writeFile } = require('fs').promises;
const {
  getAllTalkers,
  pushTalker,
  createObject,
  talkerName,
  talkerRate,
  talkerDate,
  createObjectWithPatch,
  pushTalkerWitchPatch,
  createObjectFromDb,
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
  validateQueryRate,
  validateQueryDate,
  validateRates,
  validateRatesNotNull,
} = require('../middlewares/talkerMiddleware');
const conn = require('../db/connection');

const talkRoute = Router();

talkRoute.get('/search', validateTokenExists, validateToken,
  validateQueryRate, validateQueryDate, async (req, res) => {
  const { q, rate, date } = req.query;
  let allTalkers = await getAllTalkers();

  if (q) allTalkers = talkerName(q, allTalkers);
  if (rate) allTalkers = talkerRate(rate, allTalkers);
  if (date) allTalkers = talkerDate(date, allTalkers);

  return res.status(200).json(allTalkers);
});

talkRoute.get('/db', async (_req, res) => {
  try {
    const [result] = await conn.execute('SELECT * FROM talkers');
    res.status(200).json(createObjectFromDb(result));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
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
  const allTalkers = await getAllTalkers();

  const newTalker = createObject(req.body, allTalkers.length + 1);

  const lastTalker = await pushTalker(newTalker);

  res.status(201).json(lastTalker);
});

talkRoute.put('/:id', validateTokenExists, validateToken, validateNameNotNull, validateNameLength,
validateAgeNotNull, validateAge, validateTalkNotNull, validateWatchedNotNull, validateWatchedFormat,
validateRateNotNull, validateRate, async (req, res) => {
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
  const { id } = req.params;
  const allTalkers = await getAllTalkers();
  const deletedTalker = allTalkers.find((talker) => talker.id === +id);
  const newListTalkers = allTalkers.splice(deletedTalker, 1);

  writeFile('src/talker.json', JSON.stringify(newListTalkers, null, 2));
  
  res.status(204).json(deletedTalker);
});

talkRoute.patch('/rate/:id', validateTokenExists, validateToken,
   validateRatesNotNull, validateRates, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const allTalkers = await getAllTalkers();
  const filteredTalker = allTalkers.find((talker) => talker.id === +id);
  const newTalkerWithRate = createObjectWithPatch(filteredTalker, id, rate);
  pushTalkerWitchPatch(newTalkerWithRate, id);
  
  res.status(204).json(newTalkerWithRate);
});

module.exports = talkRoute;