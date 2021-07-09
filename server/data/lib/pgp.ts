import bluebird from 'bluebird';
import monitor from 'pg-monitor';
import config from 'config';
import pgpFactory from 'pg-promise';

const initOptions = {
  capSQL: true, // generate capitalized SQL
  promiseLib: bluebird
};

if (config.has('config.database.logSQL') && config.get('config.database.logSQL')) {
  monitor.attach(initOptions); // attach all query-related events by pg-promise
}

const pgp = pgpFactory(initOptions);

export default pgp;
