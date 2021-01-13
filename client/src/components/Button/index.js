import React from 'react';

const Button = ({ value, onClick, disabled }) => (
  <>
    <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {value}
    </button>
  </>
);

export default Button;
