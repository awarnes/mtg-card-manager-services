import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getHops} from '../data/getHops';
import constants from '../lib/constants';
import hopsSchema from '../data/joi-schemas/hops-schema';

function handleGetHops(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getHops(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/hops/{id}',
  handler: handleGetHops,
  options: {
    auth: false,
    description: 'Get a single hops data entry',
    notes: 'Gets specific hops data entry if id provided',
    tags: ['brew-data', 'open', 'hops'],
    response: {
      schema: Joi.array().items(Joi.object({...hopsSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
