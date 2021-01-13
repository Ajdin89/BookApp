import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ children, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/books',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({ isAuth: state.user.isAuth });

export default connect(mapStateToProps)(PublicRoute);
