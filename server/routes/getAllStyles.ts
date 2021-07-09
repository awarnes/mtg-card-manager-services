import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllStyles} from '../data/getStyles';
import constants from '../lib/constants';
import styleSchema from '../data/joi-schemas/style-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/style',
  handler: getAllStyles,
  options: {
    auth: false,
    description: 'Get all style data',
    notes: 'Gets all style data from the db.',
    tags: ['brew-data', 'open', 'style'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...styleSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
