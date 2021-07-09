/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const fermentableSchema = {
  fermentable_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  fermentable_type: Joi.string(), // TODO: Custom type
  amount: Joi.number(),
  yield: Joi.number()
    .min(0)
    .max(100),
  color: Joi.number(),
  add_after_boil: Joi.boolean(),
  origin: Joi.string(),
  supplier: Joi.string(),
  notes: Joi.string(),
  coarse_fine_diff: Joi.number()
    .min(0)
    .max(100),
  moisture: Joi.number()
    .min(0)
    .max(100),
  diastatic_power: Joi.number()
    .min(0)
    .max(100),
  protein: Joi.number()
    .min(0)
    .max(100),
  max_in_batch: Joi.number()
    .min(0)
    .max(100),
  recommend_mash: Joi.number(),
  ibu_gal_per_lb: Joi.number(),
  updated: Joi.date(),
  created: Joi.date()
};

export default fermentableSchema;
