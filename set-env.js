const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnv(envType, mode) {
  const envFilePath = path.join(__dirname, `.env.${envType}.${mode}`);
  if (fs.existsSync(envFilePath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  } else {
    console.error(`Environment file ${envFilePath} not found.`);
    process.exit(1);
  }
}

// Example usage: node set-env.js oem staging
const [envType, mode] = process.argv.slice(2);
loadEnv(envType, mode);

// Then you can add any command to start or build your Vue app
