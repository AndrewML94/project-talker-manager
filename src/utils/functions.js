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

const talkerName = (param, allTalkers) => allTalkers.filter(({ name }) => name.includes(param));

const talkerRate = (param, allTalkers) => allTalkers
  .filter(({ talk: { rate } }) => rate === +param);

const talkerDate = (param, allTalkers) => allTalkers
  .filter(({ talk: { watchedAt } }) => watchedAt === param);

const createObjectWithPatch = (param, oldId, ratePatch) => {
  const { name, age, talk: { watchedAt } } = param;
  return {
    name,
    age,
    id: +oldId,
    talk: {
      rate: ratePatch,
      watchedAt,
    },
  };
};

const pushTalkerWitchPatch = async (newTalker, id) => {
  try {
    const allTalkers = await getAllTalkers();
    allTalkers.forEach((elem, index) => {
      if (elem.id === +id) allTalkers.splice(index, 1, newTalker);
      return allTalkers;
    });
    const newAllTalkers = JSON.stringify(allTalkers, null, 2);

    await writeFile('src/talker.json', newAllTalkers);
    return newTalker;
  } catch (error) {
    console.error(`Erro na escrita no arquivo ${error}`);
  }
};

const createObjectFromDb = (paramDb) => {
  const talkersFromDb = [];
  
  paramDb.forEach((talker) => talkersFromDb.push(
    {
      name: talker.name,
      age: talker.age,
      id: talker.id,
      talk: {
        watchedAt: talker.talk_watched_at,
        rate: talker.talk_rate,
      },
    },
  ));

  return talkersFromDb;
};

module.exports = {
  getAllTalkers,
  pushTalker,
  createObject,
  talkerName,
  talkerRate,
  talkerDate,
  createObjectWithPatch,
  pushTalkerWitchPatch,
  createObjectFromDb,
};