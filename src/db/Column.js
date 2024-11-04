import { model, Schema } from 'mongoose';
import { cardSchema } from './Card.js';

export const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
    cards: [{ type: cardSchema }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Column = model('columns', columnSchema);
