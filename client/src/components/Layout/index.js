import React from 'react';
import Navigation from '../Navigation';

const Layout = ({ children, title }) => (
  <>
    <Navigation />

    <div className="container">
      {title && (
        <div className="row">
          <h3 className="col-12 border-bottom p-3 mb-3">{title}</h3>
        </div>
      )}

      <div className="row">{children}</div>
    </div>
  </>
);

export default Layout;
