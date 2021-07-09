import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllRecipes} from '../data/getRecipes';
import constants from '../lib/constants';
import recipeSchema from '../data/joi-schemas/recipe-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/recipe',
  handler: getAllRecipes,
  options: {
    auth: false,
    description: 'Get all recipe data',
    notes: 'Gets all recipe data from the db.',
    tags: ['brew-data', 'open', 'recipe'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...recipeSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
