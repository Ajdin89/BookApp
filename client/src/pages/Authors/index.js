import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Button from '../../components/Button';
import { remove, get } from '../../utils/ajax';
import Alert from '../../components/Alert';

const Authors = ({ isAuth }) => {
  const [authors, setAuthors] = useState([]);
  const [alert, setAlert] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await get('authors');

      if (result.success) {
        setAuthors(result.authors);
      } else {
        setAlert({ type: 'danger', message: result.msg });
      }
    };

    fetchData();
  }, []);

  const removeAuthor = async (id) => {
    setAlert({});
    const response = await remove(`authors/${id}`);

    if (response.success) {
      setAlert({ type: 'success', message: 'Author is deleted !' });
      setAuthors(authors.filter((authors) => authors.id !== id));
    } else {
      setAlert({ type: 'danger', message: response.msg });
    }
  };

  return (
    <Layout title="Authors">
      <Alert {...alert} />
      {isAuth && (
        <Link to="/create/authors" className="btn btn-primary w-25">
          Create author
        </Link>
      )}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>dob</th>
            <th>books</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`authors/${item.id}`}>
                  {item.firstName} {item.lastName}
                </Link>
              </td>
              <td>{item.lastName}</td>
              <td>{item.dob}</td>
              <td>{item.books}</td>
              <td>{item.image}</td>
              {isAuth && (
                <td>
                  <Button
                    value="Delete"
                    onClick={() => removeAuthor(item.id)}
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

export default connect(mapStateToProps)(Authors);
