import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllMashProfiles} from '../data/getMashProfiles';
import constants from '../lib/constants';
import mashProfileSchema from '../data/joi-schemas/mash-profile-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/mash-profile',
  handler: getAllMashProfiles,
  options: {
    auth: false,
    description: 'Get all mash profile data',
    notes: 'Gets all mash profile data from the db.',
    tags: ['brew-data', 'open', 'mash-profile'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...mashProfileSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
