const { Router } = require('express');
const { getAllTalkers } = require('../utils/functions');

const talkRoute = Router();

talkRoute.get('/talker', async (_req, res) => {
  const result = await getAllTalkers();
  return res.status(200).json(result);
});

module.exports = talkRoute;