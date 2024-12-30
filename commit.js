const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const git = simpleGit();

const datesToCommit = [
  moment("2025-06-28"),
  moment("2025-06-30")
];

const makeMultipleCommits = async (date) => {
  for (let i = 0; i < 5; i++) {
    const data = { date: date.format(), commitNumber: i + 1 };
    await jsonfile.writeFile(FILE_PATH, data);
    await git.add([FILE_PATH]);
    await git.commit(`Commit #${i + 1} on ${date.format("YYYY-MM-DD")}`, {
      '--date': date.format("YYYY-MM-DDTHH:mm:ss")
    });
    console.log(`✅ Commit #${i + 1} for ${date.format("YYYY-MM-DD")}`);
  }
};

const run = async () => {
  for (const date of datesToCommit) {
    await makeMultipleCommits(date);
  }

  await git.push('origin', 'main');
  console.log("🎉 Done: 28 & 30 June green ✅");
};

run();
