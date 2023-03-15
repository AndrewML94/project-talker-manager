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
    const allTalkers = JSON.stringify([newTalker]);
    console.log(allTalkers);
    await writeFile('src/talker.json', allTalkers);
  } catch (error) {
    console.error(`Erro na escrita no arquivo ${error}`);
  }
};

module.exports = {
  getAllTalkers,
  pushTalker,
};