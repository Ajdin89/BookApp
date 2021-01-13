import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

import Books from '../../pages/Books';
import Login from '../../pages/Login';
import BookDetails from '../../pages/BookDetails';
import AuthorDetails from '../../pages/AuthorDetails';
import BookCreate from '../../pages/BookCreate';
import AuthorCreate from '../../pages/AuthorsCreate';
import Authors from '../../pages/Authors';
import PublicRoute from '../PublicRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/books" component={Books} />
    <Route exact path="/authors" component={Authors} />

    <Route exact path="/books/:id" component={BookDetails} />
    <Route exact path="/authors/:id" component={AuthorDetails} />

    <PrivateRoute exact path="/edit/books/:id" component={BookCreate} />
    <PrivateRoute exact path="/edit/authors/:id" component={AuthorCreate} />

    <PrivateRoute path="/create/books" component={BookCreate} />
    <PrivateRoute path="/create/authors" component={AuthorCreate} />

    <PublicRoute exact path="/login" component={Login} />
    <Redirect from="/" to="/books" />
  </Switch>
);

export default Routes;
