import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllYeast} from '../data/getYeast';
import constants from '../lib/constants';
import yeastSchema from '../data/joi-schemas/yeast-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/yeast',
  handler: getAllYeast,
  options: {
    auth: false,
    description: 'Get all yeast data',
    notes: 'Gets all yeast data from the db.',
    tags: ['brew-data', 'open', 'yeast'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...yeastSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
