import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllHops} from '../data/getHops';
import constants from '../lib/constants';
import hopsSchema from '../data/joi-schemas/hops-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/hops',
  handler: getAllHops,
  options: {
    auth: false,
    description: 'Get all hops data',
    notes: 'Gets all hops data from the db.',
    tags: ['brew-data', 'open', 'hops'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...hopsSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
