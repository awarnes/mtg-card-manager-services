import { ParameterizedQuery } from 'pg-promise';
import connection from '../lib/connection';

const sql = new ParameterizedQuery(`
UPDATE users
SET password = crypt($2, gen_salt('bf'))
WHERE username = $1;`);

export function updatePassword(username: string, newPassword: string): Promise<Boolean | Error> {
  return connection
    .none(sql, [username, newPassword])
    .then(() => {
      console.log(`Successfully updated ${username}'s password.`);
      return true;
    })
    .catch((error: Error) => {
      console.error('ERROR: ', error);
      return error;
    });
}
