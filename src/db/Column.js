import { model, Schema } from 'mongoose';

const ColumnsSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId, 
      ref: 'boards'
    },
    title: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export const Column = model('Columns', ColumnsSchema);
