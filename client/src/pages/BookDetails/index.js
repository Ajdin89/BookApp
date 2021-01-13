import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { get } from '../../utils/ajax';

const BookDetails = () => {
  const [book, setBook] = useState({
    title: '',
    pages: 0,
    published: 0,
  });
  const [authors, setAuthors] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const bookResponse = await get(`books/${id}`);
      setBook(bookResponse.book);

      const authorResponse = await get(`books/${id}/authors`);
      setAuthors(authorResponse.authors);
    };

    fetchData();
  }, []);

  const { title, pages, published } = book;
  return (
    <Layout title="Book details">
      <div className="mb-3">
        <label className="form-label">Title: {title}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Pages: {pages}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Published: {published}</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Authors:</label>
        {authors.map((author) => (
          <Link key={author.id} to={`authors/${author.id}`}>
            {author.firstName} {author.lastName}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default BookDetails;
