import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { get, remove } from '../../utils/ajax';

const Books = ({ isAuth }) => {
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await get('books');

      if (result.success) {
        setBooks(result.books);
      } else {
        setAlert({ type: 'danger', message: result.msg });
      }
    };

    fetchData();
  }, []);

  const removeBook = async (id) => {
    setAlert({});
    const response = await remove(`books/${id}`);

    if (response.success) {
      setAlert({ type: 'success', message: 'Book is deleted !' });
      setBooks(books.filter((book) => book.isbn !== id));
    } else {
      setAlert({ type: 'danger', message: response.msg });
    }
  };

  return (
    <Layout title="Books">
      <Alert {...alert} />
      {isAuth && (
        <Link to="/create/books" className="btn btn-primary w-25">
          Create book
        </Link>
      )}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>pages</th>
            <th>published</th>
            <th>authors</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {books.map((item, index) => (
            <tr key={item.isbn}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`books/${item.isbn}`}>{item.title}</Link>
              </td>
              <td>{item.pages}</td>
              <td>{item.published}</td>
              <td>{item.authors}</td>
              <td>{item.image}</td>
              {isAuth && (
                <td>
                  <Button
                    value="Delete"
                    onClick={() => removeBook(item.isbn)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

const mapStateToProps = (state) => ({ isAuth: state.user.isAuth });

export default connect(mapStateToProps)(Books);
