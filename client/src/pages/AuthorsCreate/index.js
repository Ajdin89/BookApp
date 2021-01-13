import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { get, post, put } from '../../utils/ajax';
import { Link, useHistory, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';

const AuthorCreate = () => {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState({
    firstName: '',
    lastName: '',
  });
  const params = useParams();
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const isCreate = isEmpty(params);
  const title = isCreate ? 'Create author' : 'Edit author';
  const button = isCreate ? 'Save' : 'Update';
  const history = useHistory();

  useEffect(() => {
    if (!isCreate) {
      const { id } = params;
      const fetchData = async () => {
        const authorResponse = await get(`authors/${id}`);
        setAuthor(authorResponse.author);

        const bookResponse = await get(`authors/${id}/books`);
        setBooks(bookResponse.books);
      };
      fetchData();
    }
  }, []);

  const submit = async () => {
    setAlert({});
    setLoading(true);

    const response = isCreate
      ? await post('authors', author)
      : await put('authors', author);

    if (response.success) {
      history.push('/authors');
    } else {
      setAlert({ type: 'danger', message: response.msg });
    }

    setLoading(false);
  };

  return (
    <Layout title={title}>
      <Alert {...alert} />
      <TextInput
        id="firstName"
        type="text"
        label="First name"
        placeholder="firstName"
        value={author.firstName}
        onChange={(value) => setAuthor({ ...author, firstName: value })}
      />
      <TextInput
        id="lastName"
        type="text"
        label="Last name"
        placeholder="lastName"
        value={author.lastName}
        onChange={(value) => setAuthor({ ...author, lastName: value })}
      />
      <div className="mb-3">
        <label className="form-label">Books:</label>
        {books.map((book) => (
          <Link key={book.isbn} to={`books/${book.isbn}`}>
            {author.title}
          </Link>
        ))}
      </div>
      <Button value={button} onClick={submit} disabled={loading} />
    </Layout>
  );
};

export default AuthorCreate;
