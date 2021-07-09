import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getFermentable} from '../data/getFermentables';
import constants from '../lib/constants';
import fermentableSchema from '../data/joi-schemas/fermentable-schema';

function handleGetFermentable(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getFermentable(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/fermentable/{id}',
  handler: handleGetFermentable,
  options: {
    auth: false,
    description: 'Get a single fermentable data entry',
    notes: 'Gets specific fermentable data entry if id provided',
    tags: ['brew-data', 'open', 'fermentable'],
    response: {
      schema: Joi.array().items(Joi.object({...fermentableSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
