import connection from './lib/connection';

const sqlAll = `SELECT * FROM recipe;`;

export function getAllRecipes(): Promise<Array<any> | Error> {
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
  SELECT * FROM recipe
    WHERE recipe_id = $1;
`;

export function getRecipe(id?: string): Promise<Array<any> | Error> {
  return connection
    .any(sqlOne, id)
    .then(result => result || [])
    .catch((error: Error) => {
      console.log('ERROR: ', error);
      return error;
    });
}
