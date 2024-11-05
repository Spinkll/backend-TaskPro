import { model, Schema } from 'mongoose';
import { PRIORITY_VARS } from '../constants/index.js';

export const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: [
        PRIORITY_VARS.LOW,
        PRIORITY_VARS.MEDIUM,
        PRIORITY_VARS.HIGH,
        PRIORITY_VARS.WITHOUT,
      ],
      default: PRIORITY_VARS.WITHOUT,
    },
    date: { type: String, required: true },
    columnId: { type: Schema.Types.ObjectId, ref: 'columns' },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Card = model('cards', cardSchema);
