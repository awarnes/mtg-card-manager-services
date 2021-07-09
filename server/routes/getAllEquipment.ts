import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getAllEquipment} from '../data/getEquipment';
import constants from '../lib/constants';
import equipmentSchema from '../data/joi-schemas/equipment-schema';

const route: ServerRoute = {
  method: 'GET',
  path: '/equipment',
  handler: getAllEquipment,
  options: {
    auth: false,
    description: 'Get all equipment data',
    notes: 'Gets all equipment data from the db.',
    tags: ['brew-data', 'open', 'equipment'],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...equipmentSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
