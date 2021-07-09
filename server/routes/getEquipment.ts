import {ServerRoute, Request} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {getEquipment} from '../data/getEquipment';
import constants from '../lib/constants';
import equipmentSchema from '../data/joi-schemas/equipment-schema';

function handleGetEquipment(request: Request): Promise<Array<any[]> | Error> {
  const id = request.params.id;

  return getEquipment(id);
}

const route: ServerRoute = {
  method: 'GET',
  path: '/equipment/{id}',
  handler: handleGetEquipment,
  options: {
    auth: false,
    description: 'Get a single equipment data entry',
    notes: 'Gets specific equipment data entry if id provided',
    tags: ['brew-data', 'open', 'equipment'],
    response: {
      schema: Joi.array().items(Joi.object({...equipmentSchema})),
      sample: constants.responseSampling
    }
  }
};

export default route;
