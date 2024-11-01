import { model, Schema } from 'mongoose';

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    idCard: { type: String, required: true },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Without'],
      default: 'Medium',
    },
    date: { type: String },
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
