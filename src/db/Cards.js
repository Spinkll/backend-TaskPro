import { model, Schema } from 'mongoose';

const CardsSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId, 
      ref: 'boards'
    },
    columnId: {
        type: Schema.Types.ObjectId, 
        ref: 'Columns'
      },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      default:  'Without'
    },
    deadline: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

export const Card = model('Cards', CardsSchema);