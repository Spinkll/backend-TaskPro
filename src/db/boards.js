import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, 
      ref: 'users'
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '/src/images/icons.svg#icon-icon-1-square',
    },
    background: {
      type: String,
      default: 'grey',
    },
  },
  {
    timestamps: true,
  },
);

export const boardsModel = model('boards', boardsSchema);
