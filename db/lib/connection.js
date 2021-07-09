/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const pgp = require('./pgp').pgp;

const databaseUrl = config.get('brew-db.database.uri');
const defaultDbUrl = config.get('brew-db.defaultDb.uri');

const connection = pgp(databaseUrl);

const baseConnection = pgp(defaultDbUrl);

module.exports = {
  connection,
  baseConnection
};
