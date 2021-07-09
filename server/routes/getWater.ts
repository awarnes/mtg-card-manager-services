import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getWater} from '../data/getWater';
import constants from '../lib/constants';
import waterSchema from '../data/joi-schemas/water-schema';

function handleGetWater(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getWater(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/water/{id}',
  handler: handleGetWater,
  options: {
    auth: false,
    description: 'Get a single water data entry',
    notes: 'Gets specific water data entry if id provided',
    tags: ['brew-data', 'open', 'water'],
    response: {
      schema: Joi.array().items(Joi.object({...waterSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
