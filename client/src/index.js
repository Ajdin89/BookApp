import React from 'react';
import { render } from 'react-dom';
import Routes from './components/Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'
import './scss/app.scss';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

render(<App />, document.getElementById('root'));
