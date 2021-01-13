import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { get } from '../../utils/ajax';

const AuthorDetails = () => {
  const [author, setAuthor] = useState({
    firstName: '',
    lastName: '',
    dob: '',
  });
  const [books, setBooks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const authorResponse = await get(`authors/${id}`);
      setAuthor(authorResponse.author);

      const bookResponse = await get(`authors/${id}/books`);
      setBooks(bookResponse.books);
    };
    fetchData();
  }, []);

  const { firstName, lastName, dob } = author;
  return (
    <Layout title="Author details">
      <div className="mb-3">
        <label className="form-label">Firstname: {firstName}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Pages: {lastName}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Date of birth: {dob}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Books:</label>
        {books.map((book) => (
          <Link key={book.isbn} to={`books/${book.isbn}`}>
            {book.title}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default AuthorDetails;
