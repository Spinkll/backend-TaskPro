import { model, Schema } from 'mongoose';

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Without'],
      default: 'Without',
      required: true,
    },
    date: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardsId: { type: Schema.Types.ObjectId, ref: 'boards' },
    columnsId: { type: Schema.Types.ObjectId, ref: 'columns' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CardsCollection = model('cards', cardSchema);
