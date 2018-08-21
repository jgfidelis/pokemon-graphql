import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    types: {
      type: [String],
      required: true,
    },
  },
  {
    collection: 'Pokemon',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default mongoose.model('Pokemon', Schema);
