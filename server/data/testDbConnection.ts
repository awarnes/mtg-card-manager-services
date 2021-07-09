import connection from './lib/connection';
import {Request, ResponseToolkit, ResponseObject} from '@hapi/hapi';
const sql = `SELECT * FROM recipe;`;

export default function testDbConnection(
  request: Request,
  h: ResponseToolkit
): Promise<object[] | ResponseObject> {
  return connection
    .any(sql)
    .then(result => result || [])
    .catch((error: Error) => {
      request.log('error', error);
      console.error('ERROR: ', error);
      return h.response({statusCode: 420, body: error});
    });
}
