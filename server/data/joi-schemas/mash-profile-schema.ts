/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const mashProfileSchema = {
  mash_profile_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  grain_temp: Joi.number(),
  notes: Joi.string(),
  tun_temp: Joi.number(),
  sparge_temp: Joi.number(),
  ph: Joi.number(),
  tun_weight: Joi.number(),
  tun_specific_heat: Joi.number(),
  equip_adjust: Joi.boolean(),
  updated: Joi.date(),
  created: Joi.date()
};

export default mashProfileSchema;
