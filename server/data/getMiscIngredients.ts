import connection from './lib/connection';

const sqlAll = `SELECT * FROM misc_ingredient;`;

export function getAllMiscIngredients(): Promise<Array<any> | Error> {
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
  SELECT * FROM misc_ingredients
    WHERE misc_id = $1;
`;

export function getMiscIngredient(id?: string): Promise<Array<any> | Error> {
  return connection
    .any(sqlOne, id)
    .then(result => result || [])
    .catch((error: Error) => {
      console.log('ERROR: ', error);
      return error;
    });
}
