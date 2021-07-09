import { ParameterizedQuery } from 'pg-promise';
import connection from '../lib/connection';


const sql = new ParameterizedQuery(`
  INSERT INTO users (username, password) VALUES (
  $1,
  crypt($2, gen_salt('bf'))
);`);

export function createUser(username: string, password: string): Promise<Boolean | Error> {
  return connection
    .none(sql, [username, password])
    .then(() => {
      console.log(`Added ${username} successfully!`);
      return true;
    })
    .catch((error: Error) => {
      console.error('ERROR: ', error);
      return error;
    });
}
