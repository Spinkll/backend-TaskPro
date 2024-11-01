import { model, Schema } from 'mongoose';
import { BG_VARS, ICON_VARS } from '../constants/index.js';

const columnSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ColumnsCollection = model('columns', columnSchema);
