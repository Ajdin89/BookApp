import React from 'react';

const TextInput = ({ id, label, value, onChange, type, placeholder }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      value={value}
      type={type}
      className="form-control"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
