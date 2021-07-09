import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getMashStep} from '../data/getMashSteps';
import constants from '../lib/constants';
import mashStepSchema from '../data/joi-schemas/mash-step-schema';

function handleGetMashStep(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getMashStep(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/mash-step/{id}',
  handler: handleGetMashStep,
  options: {
    auth: false,
    description: 'Get a single mash-step data entry',
    notes: 'Gets specific mash-step data entry if id provided',
    tags: ['brew-data', 'open', 'mash-step'],
    response: {
      schema: Joi.array().items(Joi.object({...mashStepSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
