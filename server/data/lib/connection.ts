import config from 'config';
import pgp from './pgp';

const connection = pgp(config.get('brew-db.database.uri'));

export default connection;
