import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getStyle} from '../data/getStyles';
import constants from '../lib/constants';
import styleSchema from '../data/joi-schemas/style-schema';

function handleGetStyle(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getStyle(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/style/{id}',
  handler: handleGetStyle,
  options: {
    auth: false,
    description: 'Get a single style data entry',
    notes: 'Gets specific style data entry if id provided',
    tags: ['brew-data', 'open', 'style'],
    response: {
      schema: Joi.array().items(Joi.object({...styleSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
