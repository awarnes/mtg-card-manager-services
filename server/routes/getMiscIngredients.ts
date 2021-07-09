import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getMiscIngredient} from '../data/getMiscIngredients';
import constants from '../lib/constants';
import miscIngredientSchema from '../data/joi-schemas/misc-ingredient-schema';

function handleGetMiscIngredient(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getMiscIngredient(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/misc-ingredient/{id}',
  handler: handleGetMiscIngredient,
  options: {
    auth: false,
    description: 'Get a single misc ingredient data entry',
    notes: 'Gets specific misc ingredient data entry if id provided',
    tags: ['brew-data', 'open', 'misc-ingredient'],
    response: {
      schema: Joi.array().items(Joi.object({...miscIngredientSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
