import { model, Schema } from 'mongoose';
import { cardSchema } from './Card.js';

export const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Column = model('columns', columnSchema);
