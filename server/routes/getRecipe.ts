import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getRecipe} from '../data/getRecipes';
import constants from '../lib/constants';
import recipeSchema from '../data/joi-schemas/recipe-schema';

function handleGetRecipe(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getRecipe(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/recipe/{id}',
  handler: handleGetRecipe,
  options: {
    auth: false,
    description: 'Get a single equipment data entry',
    notes: 'Gets specific equipment data entry if id provided',
    tags: ['brew-data', 'open', 'equipment'],
    response: {
      schema: Joi.array().items(Joi.object({...recipeSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
