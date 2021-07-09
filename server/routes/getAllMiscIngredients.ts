import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllMiscIngredients} from '../data/getMiscIngredients';
import constants from '../lib/constants';
import miscIngredientSchema from '../data/joi-schemas/misc-ingredient-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/misc-ingredient',
  handler: getAllMiscIngredients,
  options: {
    auth: false,
    description: 'Get all misc ingredient data',
    notes: 'Gets all misc ingredient data from the db.',
    tags: ['brew-data', 'open', 'misc-ingredient'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...miscIngredientSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
