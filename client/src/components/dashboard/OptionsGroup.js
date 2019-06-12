import React, { useState } from 'react';
import AddOptionOverlay from './AddOptionOverlay';

function OptionsGroup(props) {
  const { type, options, label } = props;

  const [overlayVisible, changeOverlayVisibility] = useState(false);

  return (
    <div className="form-group">
      <label>
        {label}
        <button
          type="button"
          className="add-option-button"
          onClick={() => changeOverlayVisibility(!overlayVisible)}>
          +
        </button>
      </label>

      {overlayVisible ? (
        <AddOptionOverlay
          {...props}
          closeOverlay={() => changeOverlayVisibility(false)}
        />
      ) : null}

      <div className="options" id={type}>
        {options}
      </div>
    </div>
  );
}

export default OptionsGroup;
