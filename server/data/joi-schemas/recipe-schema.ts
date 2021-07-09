/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const recipeSchema = {
  recipe_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  type: Joi.string(), // TODO: Custom Type
  style_id: Joi.number(),
  brewer: Joi.string(),
  asst_brewer: Joi.string(),
  batch_size: Joi.number(),
  boil_size: Joi.number(),
  boil_time: Joi.number(),
  efficiency: Joi.number()
    .min(0)
    .max(100),
  notes: Joi.string(),
  taste_notes: Joi.string(),
  taste_rating: Joi.number()
    .min(0)
    .max(100),
  og: Joi.number(),
  fg: Joi.number(),
  fermentation_stages: Joi.number(),
  primary_age: Joi.number(),
  primary_temp: Joi.number(),
  secondary_age: Joi.number(),
  secondary_temp: Joi.number(),
  tertiary_age: Joi.number(),
  tertiary_temp: Joi.number(),
  age: Joi.number(),
  age_temp: Joi.number(),
  date: Joi.date(),
  carbonation: Joi.number(),
  forced_carbonation: Joi.boolean(),
  priming_sugar_name: Joi.string(),
  keg_priming_factor: Joi.number(),
  updated: Joi.date(),
  created: Joi.date()
};

export default recipeSchema;
