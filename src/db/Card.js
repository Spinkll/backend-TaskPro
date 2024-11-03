import { model, Schema } from 'mongoose';

export const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'without'],
      default: 'without',
      required: true,
    },
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardId: { type: Schema.Types.ObjectId, ref: 'boards' },
    columnId: { type: Schema.Types.ObjectId, ref: 'columns' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Card = model('cards', cardSchema);
