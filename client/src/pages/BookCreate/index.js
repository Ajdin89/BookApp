import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { get, post, put } from '../../utils/ajax';
import { Link, useHistory, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';

const BookCreate = () => {
  const [book, setBook] = useState({
    title: '',
    pages: 0,
    published: 0,
    image: '',
  });
  const [authors, setAuthors] = useState([]);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const isCreate = isEmpty(params);
  const title = isCreate ? 'Create book' : 'Edit book';
  const button = isCreate ? 'Save' : 'Update';

  useEffect(() => {
    if (!isCreate) {
      const { id } = params;
      const fetchData = async () => {
        const bookResponse = await get(`books/${id}`);
        setBook(bookResponse.book);

        const authorResponse = await get(`books/${id}/authors`);
        setAuthors(authorResponse.authors);
      };

      fetchData();
    }
  }, []);

  const submit = async () => {
    setAlert({});
    setLoading(true);

    const response = isCreate
      ? await post('books', book)
      : await put('books', book);

    if (response.success) {
      history.push('/books');
    } else {
      setAlert({ type: 'danger', message: response.msg });
    }

    setLoading(false);
  };

  return (
    <Layout title={title}>
      <Alert {...alert} />
      <TextInput
        id="title"
        type="text"
        label="Title"
        placeholder="title"
        value={book.title}
        onChange={(value) => setBook({ ...book, title: value })}
      />
      <TextInput
        id="pages"
        type="number"
        label="Pages"
        placeholder="pages"
        value={book.pages}
        onChange={(value) => setBook({ ...book, pages: value })}
      />
      <TextInput
        id="published"
        type="number"
        label="Published"
        placeholder="published"
        value={book.published}
        onChange={(value) => setBook({ ...book, published: value })}
      />
      <div className="mb-3">
        <label className="form-label">Authors:</label>
        {authors.map((author) => (
          <Link key={author.id} to={`authors/${author.id}`}>
            {author.firstName} {author.lastName}
          </Link>
        ))}
      </div>
      <Button value={button} onClick={submit} disabled={loading} />
    </Layout>
  );
};

export default BookCreate;
