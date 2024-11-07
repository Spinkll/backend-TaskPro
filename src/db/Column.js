import { model, Schema } from 'mongoose';

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
