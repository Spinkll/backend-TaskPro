import { model, Schema } from 'mongoose';

const boardsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: 'grey',
    },
    icon: {
      type: String,
      default: '/src/images/icons.svg#icon-icon-1-square',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const boardsModel = model('boards', boardsSchema);
