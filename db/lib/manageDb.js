/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const connection = require('./connection').connection;
const baseConnection = require('./connection').baseConnection;
const {QueryFile} = require('pg-promise');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

const basePath = __dirname.split('/');
const dataPath = basePath
  .slice(0, basePath.length - 1)
  .concat('patches')
  .join('/');

// Some hardcoded variables GROSS!
// TODO: Move these to config.
const state = {
  name: 'mtg-card-manager',
  conn: connection,
  baseConn: baseConnection,
  schemaRun: false,
  dataPath
};

// Create a database given a connection and db name as string
function createDatabase(conn, dbName) {
  return conn.query(`CREATE DATABASE "${dbName}";`).catch(error => {
    console.log(`Error creating ${dbName}: ${error.message}`);
    throw error;
  });
}

// Validate a database exists and create it if not.
function dbExists(state) {
  console.log(`Checking database ${state.name} exists!`);
  const sql = `SELECT count(*) FROM pg_database WHERE datname = '${state.name}'`;
  return state.baseConn.query(sql).then(async result => {
    if (result[0].count === 0) {
      console.error(`DB ${state.name} not found, creating it now...`);
      await createDatabase(state.baseConn, state.name);
    } else {
      console.log(`Database ${state.name} found!`);
    }
    return state;
  });
}

// Validate base_schema.sql has already been run on DB
async function validateBaseSchemaRun(state) {
  console.log('Validating base schema has been run');
  return await state.conn
    .any(
      `
      select * from information_schema.tables
      where table_catalog = 'mtg-card-manager'
      and table_schema != 'pg_catalog'
      and table_schema != 'information_schema';
      `
    )
    .then(result => {
      if (result.length > 0) {
        console.log('Base schema already run');
        state.schemaRun = true;
      }
      return state;
    })
    .catch(error => error);
}

// If not run, execute base_schema on db
async function executeBaseSchema(state) {
  console.log('Executing the base schema file...');
  const baseSchemaFilePath = path.join(state.dataPath, 'base_schema.sql');
  console.log(baseSchemaFilePath);
  const baseSchema = new QueryFile(baseSchemaFilePath, {minify: true});
  await state.conn.tx('execute-base-schema', async transaction => {
    return await transaction.query(baseSchema);
  });
  state.schemaRun = true;
  return state;
}

// Find all patch/purge files that have been staged locally.
function getAllPatchFiles(state, type) {
  console.log(`Getting all locally staged ${type} files...`);
  const {dataPath} = state;
  if (fs.existsSync(dataPath)) {
    return fs
      .readdirSync(path.join(dataPath))
      .filter(name => name.charAt(0) !== '.' && name.includes(type));
  }
  return [];
}

// Get all patch/purge files from db that have already been run
function readAllPatchFiles(state) {
  console.log('Reading all patches from database...');
  const sql = `SELECT filename FROM patch_history`;
  return state.conn.any(sql).then(result => {
    return result;
  });
}

// Run all missing patch/purge files against db.
async function runAllPatchFiles(state) {
  // Gets all files that have been run
  const activePatches = await readAllPatchFiles(state);

  // Gets patch and purge files that have not yet been run
  const stagedPatches = getAllPatchFiles(state, 'patch').filter(
    patch => !activePatches.includes(patch)
  );

  const stagedPurges = getAllPatchFiles(state, 'purge').filter(
    purge => !activePatches.includes(purge)
  );

  if (stagedPatches.length === 0 && stagedPurges.length === 0) {
    console.log('No patches or purge files to apply to database');
    console.log('Everything completed successfully!');
    process.exit(0);
  }

  console.log(
    `Applying ${stagedPatches.length} patches and ${stagedPurges.length} purges to the database`
  );

  // Runs all staged patches then all staged purges and adds them to the patch_history table.
  return Promise.map([...stagedPatches, ...stagedPurges], fileName => {
    console.log(`Applying ${fileName} to ${state.name}`);

    // Creates a query file from the patch file
    const queryFile = new QueryFile(path.join(state.dataPath, fileName), {minify: true});
    // Runs the created queryFile on the DB and adds the patch file to the patch_history table
    return state.conn
      .query(queryFile)
      .then(() => state.conn.query(`INSERT INTO patch_history(filename) VALUES('${fileName}')`));
  });
}

function initDb(state) {
  return dbExists(state)
    .then(validateBaseSchemaRun)
    .then(state => {
      if (!state.schemaRun) {
        return executeBaseSchema(state);
      } else {
        return state;
      }
    })
    .catch(error => console.log(error));
}

function updateDb(state) {
  return initDb(state)
    .then(runAllPatchFiles)
    .catch(error => console.log(error));
}

// Run full update of database
updateDb(state);

module.exports = {
  initDb,
  updateDb
};
