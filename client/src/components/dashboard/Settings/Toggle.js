import React from 'react';
import '../../../css/Toggle.css';

const Toggle = props => {
  return (
    <div className="toggle">
      <label>
        <input
          type="checkbox"
          onChange={() => props.handleChange()}
          defaultChecked={props.toggled}
        />
        
        <i />
      </label>
    </div>
  );
};

export default Toggle;
