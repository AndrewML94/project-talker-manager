const { readFile, writeFile } = require('fs').promises;

const getAllTalkers = async () => {
  try {
    const talkers = await readFile('src/talker.json', 'utf-8');
    return JSON.parse(talkers);
  } catch (error) {
    console.error(`Erro na leitura do arquivo ${error}`);
  }
};

const pushTalker = async (newTalker) => {
  try {
    const allTalkers = await getAllTalkers();
    allTalkers.push(newTalker);
    const newAllTalkers = JSON.stringify(allTalkers, null, 2);

    await writeFile('src/talker.json', newAllTalkers);
    return newTalker;
  } catch (error) {
    console.error(`Erro na escrita no arquivo ${error}`);
  }
};

const createObject = (param, id) => {
  const { name, age, talk: { watchedAt, rate } } = param;
  const oldId = id;
  return {
    name,
    age,
    id: oldId,
    talk: {
      rate,
      watchedAt,
    },
  };
};

module.exports = {
  getAllTalkers,
  pushTalker,
  createObject,
};