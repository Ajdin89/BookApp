import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import auth from '../../middleware/auth';

import Authors from '../../models/authors';
import Books from '../../models/books';

const router = Router();

/**
 * @route   GET api/authors
 * @desc    Get list of authors
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const authors = await Authors.find();
    if (!authors)
      res.status(400).json({ msg: 'No authors exits', success: false });
    res.status(200).json({ success: true, authors });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   POST api/authors
 * @desc    Create new authors
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  try {
    const newAuthor = {
      ...req.body,
      dob: Date.now(),
      id: uuidv4(),
    };
    const author = await new Authors(newAuthor).save();
    if (!author)
      res
        .status(400)
        .json({ msg: 'Something went wrong with authors', success: false });

    res.status(201).json({ success: true, author });
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});

/**
 * @route   GET api/authors/:id
 * @desc    Get single author
 * @access  Private
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const author = await Authors.findOne({ id: req.params.id });
    if (!author)
      res
        .status(400)
        .json({ msg: 'Something went wrong with authors', success: false });

    res.status(200).json({ success: true, author });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found' });
  }
});

/**
 * @route   PUT api/authors/:id
 * @desc    Update authors
 * @access  Private
 */

router.put('/:id', auth, async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const update = { ...req.body };

    const author = await Authors.findOneAndUpdate(filter, update);
    res.status(200).json({ success: true, author });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found' });
  }
});

/**
 * @route   DELETE api/author/:id
 * @desc    Delete author
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const update = { ...req.body };

    const author = await Authors.findOneAndDelete(filter, update);
    res.status(200).json({ success: true, author });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found' });
  }
});

/**
 * @route   DELETE api/authors/{idBook}/books/{idAuthor}
 * @desc    Delete {idBook} book from {idAuthor} author
 * @access  Private
 */

router.delete('/{idBook}/books/{idAuthor}', auth, async (req, res) => {
  try {
    const { idBook, idAuthor } = req.params;
    const filter = { id: idAuthor };
    const update = { $pop: { books: { isbn: idBook } } };

    const author = await Authors.updateOne(filter, update);
    res.status(200).json({ success: true, author });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found book or author' });
  }
});

/**
 * @route   POST api/books/books/{id}/authors
 * @desc    Add new book to {idAuthor} author
 * @access  Private
 */

router.post('/{idAuthor}/books', auth, async (req, res) => {
  try {
    const book = req.body;
    const idAuthor = req.params.idAuthor;
    const filter = { id: idAuthor };
    const update = { $push: { books: book } };

    const author = await Authors.updateOne(filter, update);
    res.status(200).json({ success: true, author });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found author' });
  }
});

/**
 * @route   GET api/books/books/{id}/authors
 * @desc    Get list books for {idAuthor} author
 * @access  Private
 */

router.get('/{id}/books', auth, async (req, res) => {
  try {
    const idAuthor = req.params.id;
    const filter = { id: idAuthor };

    const books = await Books.findOne(filter).populate('books').books;

    res.status(200).json({ success: true, books });
  } catch (e) {
    res.status(404).json({ success: false, msg: 'Not found authors' });
  }
});

export default router;
