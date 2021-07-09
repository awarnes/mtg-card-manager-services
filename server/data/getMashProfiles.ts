import connection from './lib/connection';

const sqlAll = `SELECT * FROM mash_profile;`;

export function getAllMashProfiles(): Promise<Array<any> | Error> {
  return connection
    .any(sqlAll)
    .then((response: Array<any>) => {
      console.log(response);
      return response;
    })
    .catch((error: Error) => {
      console.log('ERROR: ', error);
      return error;
    });
}

const sqlOne = `
  SELECT * FROM mash_profile
    WHERE mash_profile_id = $1;
`;

export function getMashProfile(id?: string): Promise<Array<any> | Error> {
  return connection
    .any(sqlOne, id)
    .then(result => result || [])
    .catch((error: Error) => {
      console.log('ERROR: ', error);
      return error;
    });
}
