import { Router } from 'express';
import auth from '../../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

import Books from '../../models/books';

const router = Router();

/**
 * @route   GET api/books
 * @desc    Get list of books
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const books = await Books.find();
    if (!books) res.status(400).json({ msg: 'No book exists', success: false });
    res.status(200).json({ success: true, books });
  } catch (e) {
    res.status(400).json({ msg: 'No book found', success: false });
  }
});

/**
 * @route   POST api/books
 * @desc    Create new book
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  try {
    const newBook = {
      ...req.body,
      isbn: uuidv4(),
    };
    const book = await new Books(newBook).save();
    if (!book)
      res
        .status(400)
        .json({ msg: 'Something went wrong saving the book', success: false });

    res.status(201).json({ success: true, book });
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});

/**
 * @route   GET api/books/:id
 * @desc    Get single book
 * @access  Private
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Books.findOne({ isbn: req.params.id });
    if (!book)
      res
        .status(400)
        .json({ msg: 'Something went wrong saving the book', success: false });

    res.status(200).json({ success: true, book });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found book' });
  }
});

/**
 * @route   PUT api/books/:id
 * @desc    Update book
 * @access  Private
 */

router.put('/:id', auth, async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const update = { ...req.body };

    await Books.findOneAndUpdate(filter, update);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found' });
  }
});

/**
 * @route   DELETE api/books/:id
 * @desc    Delete book
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const filter = { isbn: req.params.id };
    const update = { ...req.body };

    await Books.remove(filter, update);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found' });
  }
});

/**
 * @route   DELETE api/books/{idBook}/authors/{idAuthor}
 * @desc    Delete {idAuthor} author from {idBook} book
 * @access  Private
 */

router.delete('/{idBook}/authors/{idAuthor}', auth, async (req, res) => {
  try {
    const { idBook, idAuthor } = req.params;
    const filter = { isbn: idBook };
    const update = { $pop: { authors: { id: idAuthor } } };

    await Books.updateOne(filter, update);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found book or author' });
  }
});

/**
 * @route   POST api/books/{id}/authors
 * @desc    Add new author to {id} book
 * @access  Private
 */

router.post('/{id}/authors', auth, async (req, res) => {
  try {
    const author = req.body;
    const idBook = req.params.id;
    const filter = { isbn: idBook };
    const update = { $push: { authors: author } };

    await Books.updateOne(filter, update);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found book' });
  }
});

/**
 * @route   GET api/books/{id}/authors
 * @desc    Get list of authors for {id} book
 * @access  Private
 */

router.get('/{id}/authors', auth, async (req, res) => {
  try {
    const idBook = req.params.id;
    const filter = { isbn: idBook };

    const authors = await Books.findOne(filter).populate('authors').authors;

    res.status(200).json({ success: true, authors });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found authors' });
  }
});

export default router;
