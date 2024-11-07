import Joi from 'joi';
import { BG_VARS, ICON_VARS } from '../constants/index.js';

export const createBoardSchema = Joi.object({
  title: Joi.string().required().min(2).max(20),
  icon: Joi.string()
    .valid(
      ICON_VARS.ICON_1,
      ICON_VARS.ICON_2,
      ICON_VARS.ICON_3,
      ICON_VARS.ICON_4,
      ICON_VARS.ICON_5,
      ICON_VARS.ICON_6,
      ICON_VARS.ICON_7,
      ICON_VARS.ICON_8,
    )
    .default(ICON_VARS.ICON_1),
  background: Joi.string()
    .valid(
      BG_VARS.BG_1,
      BG_VARS.BG_2,
      BG_VARS.BG_3,
      BG_VARS.BG_4,
      BG_VARS.BG_5,
      BG_VARS.BG_6,
      BG_VARS.BG_7,
      BG_VARS.BG_8,
      BG_VARS.BG_9,
      BG_VARS.BG_10,
      BG_VARS.BG_11,
      BG_VARS.BG_12,
      BG_VARS.BG_13,
      BG_VARS.BG_14,
      BG_VARS.BG_15,
      BG_VARS.BG_16,
    )
    .default(BG_VARS.BG_1),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  icon: Joi.string().valid(
    ICON_VARS.ICON_1,
    ICON_VARS.ICON_2,
    ICON_VARS.ICON_3,
    ICON_VARS.ICON_4,
    ICON_VARS.ICON_5,
    ICON_VARS.ICON_6,
    ICON_VARS.ICON_7,
    ICON_VARS.ICON_8,
  ),

  background: Joi.string().valid(
    BG_VARS.BG_1,
    BG_VARS.BG_2,
    BG_VARS.BG_3,
    BG_VARS.BG_4,
    BG_VARS.BG_5,
    BG_VARS.BG_6,
    BG_VARS.BG_7,
    BG_VARS.BG_8,
    BG_VARS.BG_9,
    BG_VARS.BG_10,
    BG_VARS.BG_11,
    BG_VARS.BG_12,
    BG_VARS.BG_13,
    BG_VARS.BG_14,
    BG_VARS.BG_15,
    BG_VARS.BG_16,
  ),
});
