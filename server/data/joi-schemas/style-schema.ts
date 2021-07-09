/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const styleSchema = {
  style_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  category: Joi.string(),
  category_number: Joi.string(),
  style_letter: Joi.string(),
  style_guide: Joi.string(),
  type: Joi.string(), // TODO: Custom Type
  og_min: Joi.number(),
  og_max: Joi.number(),
  fg_min: Joi.number(),
  fg_max: Joi.number(),
  ibu_min: Joi.number(),
  ibu_max: Joi.number(),
  color_min: Joi.number(),
  color_max: Joi.number(),
  carb_min: Joi.number(),
  carb_max: Joi.number(),
  abv_min: Joi.number()
    .min(0)
    .max(100),
  abv_max: Joi.number()
    .min(0)
    .max(100),
  notes: Joi.string(),
  profile: Joi.string(),
  ingredients: Joi.number(),
  examples: Joi.number(),
  updated: Joi.date(),
  created: Joi.date()
};

export default styleSchema;
