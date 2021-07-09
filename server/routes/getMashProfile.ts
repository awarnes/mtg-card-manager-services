import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getMashProfile} from '../data/getMashProfiles';
import constants from '../lib/constants';
import mashProfileSchema from '../data/joi-schemas/mash-profile-schema';

function handleGetMashProfile(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getMashProfile(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/mash-profile/{id}',
  handler: handleGetMashProfile,
  options: {
    auth: false,
    description: 'Get a single equipment data entry',
    notes: 'Gets specific equipment data entry if id provided',
    tags: ['brew-data', 'open', 'equipment'],
    response: {
      schema: Joi.array().items(Joi.object({...mashProfileSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
