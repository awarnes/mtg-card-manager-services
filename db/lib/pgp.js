/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('config');
const pgpFactory = require('pg-promise');
const monitor = require('pg-monitor');
const bluebird = require('bluebird');

const initOptions = {
  capSQL: true, // generate capitalized SQL
  promiseLib: bluebird
};

if (config.has('config.database.logSQL') && config.get('config.database.logSQL')) {
  monitor.attach(initOptions); // attach all query-related events by pg-promise
}

const pgp = pgpFactory(initOptions);

module.exports = {pgp};
