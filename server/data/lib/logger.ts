import {ResponseObject, Request, ResponseToolkit} from '@hapi/hapi';

export default function logger(error: Error, request: Request, h: ResponseToolkit): ResponseObject {
  request.log('error', error);
  console.error('ERROR: ', error);
  return h.response({statusCode: 420, body: error});
}
