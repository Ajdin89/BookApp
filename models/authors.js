import { Schema, model } from 'mongoose';

const AuthorsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
});

const Authors = model('authors', AuthorsSchema);

export default Authors;
