const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const git = simpleGit();

// ✅ 1 July se 31 July 2024 ke dates array
const datesToCommit = [];
for (let day = 1; day <= 31; day++) {
  datesToCommit.push(moment(`2024-07-${day}`, "YYYY-MM-DD"));
}

const makeMultipleCommits = async (date) => {
  for (let i = 0; i < 3; i++) { // 3 commits per day
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
  console.log("🎉 All July commits pushed ✅");
};

run();
