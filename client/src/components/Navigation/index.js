import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { setUser } from '../../pages/Login/actions';
import Button from '../Button';

const Navigation = ({ isAuth, dispatchUser }) => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!isEmpty(token)) {
      dispatchUser({ isAuth: true });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    dispatchUser({ isAuth: false });
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/books">
              Books
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/authors">
              Authors
            </NavLink>
          </li>
          {!isAuth && (
            <li className="nav-item right-btn">
              <NavLink className="btn btn-primary" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item right-btn">
              <Button onClick={logout} value="Log out" />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({ isAuth: state.user.isAuth });

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
