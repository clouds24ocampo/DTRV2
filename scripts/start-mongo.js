const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../.mongo-data');
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

async function start() {
  console.log('Starting local persistent MongoDB on port 27017...');
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbPath: dbPath,
        storageEngine: 'wiredTiger',
      },
    });
    console.log('\n==================================================');
    console.log(` MongoDB RUNNING AT: ${mongod.getUri()}`);
    console.log(` Data Directory: ${dbPath}`);
    console.log('==================================================\n');
  } catch (err) {
    console.error('Failed to start MongoDB:', err);
    process.exit(1);
  }
}

start();
