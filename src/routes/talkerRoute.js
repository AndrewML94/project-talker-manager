const { Router } = require('express');
const { getAllTalkers } = require('../utils/functions');

const talkRoute = Router();

talkRoute.get('/', async (_req, res) => {
  const result = await getAllTalkers();
  return res.status(200).json(result);
});

talkRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getAllTalkers();
  const filteredTalker = result.find((talker) => talker.id === +id);

  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(filteredTalker);
});

module.exports = talkRoute;