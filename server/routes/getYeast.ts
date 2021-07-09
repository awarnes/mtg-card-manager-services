import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getYeast} from '../data/getYeast';
import constants from '../lib/constants';
import yeastSchema from '../data/joi-schemas/yeast-schema';

function handleGetYeast(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getYeast(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/yeast/{id}',
  handler: handleGetYeast,
  options: {
    auth: false,
    description: 'Get a single yeast data entry',
    notes: 'Gets specific yeast data entry if id provided',
    tags: ['brew-data', 'open', 'yeast'],
    response: {
      schema: Joi.array().items(Joi.object({...yeastSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
