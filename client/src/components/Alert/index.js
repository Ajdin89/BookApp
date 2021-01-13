import React from 'react';
import { isEmpty } from 'lodash';

const Alert = ({ message, type }) => {
  if (isEmpty(message)) return null;

  const alertType = isEmpty(type) ? 'light' : type;
  const className = `alert alert-${alertType}`;

  return (
    <div className={className} role="alert">
      {message}
    </div>
  );
};

export default Alert;
