/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const equipmentSchema = {
  equipment_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  boil_size: Joi.number(),
  batch_size: Joi.number(),
  tun_volume: Joi.number(),
  tun_weight: Joi.number(),
  tun_specific_heat: Joi.number(),
  top_up_water: Joi.number(),
  trub_chiller_loss: Joi.number(),
  evap_rate: Joi.number()
    .min(0)
    .max(100),
  boil_time: Joi.number(),
  calc_boil_volume: Joi.bool(),
  lauter_deadspace: Joi.number(),
  top_up_kettle: Joi.number(),
  hop_utilization: Joi.number()
    .min(0)
    .max(100),
  notes: Joi.string(),
  updated: Joi.date(),
  created: Joi.date()
};

export default equipmentSchema;
