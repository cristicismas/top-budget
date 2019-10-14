import React from 'react';
import './Toggle.css';

const Toggle = props => {
  return (
    <div className="toggle">
      <label>
        <input type="checkbox" onChange={() => props.handleChange()} checked={props.toggled} />

        <i />
      </label>
    </div>
  );
};

export default Toggle;
