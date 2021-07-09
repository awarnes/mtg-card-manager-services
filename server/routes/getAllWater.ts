import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllWater} from '../data/getWater';
import constants from '../lib/constants';
import waterSchema from '../data/joi-schemas/water-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/water',
  handler: getAllWater,
  options: {
    auth: false,
    description: 'Get all water data',
    notes: 'Gets all water data from the db.',
    tags: ['brew-data', 'open', 'water'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...waterSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
