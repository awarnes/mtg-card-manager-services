import { ParameterizedQuery } from 'pg-promise';
import connection from '../lib/connection';


const sql = new ParameterizedQuery(`
  SELECT id 
  FROM users
  WHERE username = $1 
  AND password = crypt($2, password);
);`);

export function authUser(username: string, password: string): Promise<Boolean | Error> {
  return connection
    .none(sql, [username, password])
    .then(() => {
      console.log(`User authenticated`);
      return true;
    })
    .catch((error: Error) => {
      console.error('ERROR: ', error);
      return error;
    });
}
