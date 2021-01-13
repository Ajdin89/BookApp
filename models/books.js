import { Schema, model } from 'mongoose';

const BooksSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'authors',
    },
  ],
  image: {
    type: String,
  },
});

const Books = model('Books', BooksSchema);

export default Books;
