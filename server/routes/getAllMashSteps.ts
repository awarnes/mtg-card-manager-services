import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllMashSteps} from '../data/getMashSteps';
import constants from '../lib/constants';
import mashStepSchema from '../data/joi-schemas/mash-step-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/mash-step',
  handler: getAllMashSteps,
  options: {
    auth: false,
    description: 'Get all mash step data',
    notes: 'Gets all mash step data from the db.',
    tags: ['brew-data', 'open', 'mash-step'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...mashStepSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
