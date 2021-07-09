import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllFermentables} from '../data/getFermentables';
import constants from '../lib/constants';
import fermentableSchema from '../data/joi-schemas/fermentable-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/fermentable',
  handler: getAllFermentables,
  options: {
    auth: false,
    description: 'Get all fermentable data',
    notes: 'Gets all fermentable data from the db.',
    tags: ['brew-data', 'open', 'fermentable'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...fermentableSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
