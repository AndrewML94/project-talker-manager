const { readFile } = require('fs').promises;

const getAllTalkers = async () => {
  const talkers = await readFile('src/talker.json', 'utf-8');
  return JSON.parse(talkers);
};

module.exports = {
  getAllTalkers,
};