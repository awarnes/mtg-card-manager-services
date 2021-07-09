/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const pgp = require('./pgp').pgp;

const databaseUrl = config.get('mtg-card-manager-db.database.uri');
const defaultDbUrl = config.get('mtg-card-manager-db.defaultDb.uri');

const connection = pgp(databaseUrl);

const baseConnection = pgp(defaultDbUrl);

module.exports = {
  connection,
  baseConnection
};
