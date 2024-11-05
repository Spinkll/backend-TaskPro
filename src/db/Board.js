import { model, Schema } from 'mongoose';
import { BG_VARS, ICON_VARS } from '../constants/index.js';
import { columnSchema } from './Column.js';

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    background: {
      type: String,
      enum: [
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
      ],
      default: BG_VARS.BG_1,
    },
    icon: {
      type: String,
      enum: [
        ICON_VARS.ICON_1,
        ICON_VARS.ICON_2,
        ICON_VARS.ICON_3,
        ICON_VARS.ICON_4,
        ICON_VARS.ICON_5,
        ICON_VARS.ICON_6,
        ICON_VARS.ICON_7,
        ICON_VARS.ICON_8,
      ],
      default: ICON_VARS.ICON_1,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Board = model('boards', boardSchema);
