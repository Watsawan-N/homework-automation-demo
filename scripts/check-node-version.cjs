const fs = require('fs');
const path = require('path');

const nodeVersionFile = path.resolve(__dirname, '../.nvmrc');
const requiredVersion = fs.readFileSync(nodeVersionFile, 'utf8').trim();
const requiredMajorVersion = Number(requiredVersion.split('.')[0]);
const currentVersion = process.versions.node;
const currentMajorVersion = Number(currentVersion.split('.')[0]);

if (Number.isNaN(currentMajorVersion) || currentMajorVersion < requiredMajorVersion) {
  console.error('');
  console.error(`This project requires Node.js ${requiredVersion} or newer.`);
  console.error(`Current Node.js version: ${currentVersion}`);
  console.error('');
  console.error('Quick fix:');
  console.error('  npm run setup');
  console.error('');
  console.error('Manual fix:');
  console.error(`  nvm install ${requiredVersion}`);
  console.error(`  nvm use ${requiredVersion}`);
  console.error('  npm install');
  console.error('');
  process.exit(1);
}
