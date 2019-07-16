import React, { useState } from 'react';
import AddOptionOverlay from './AddOptionOverlay';
import Option from '../Option';

const OptionsGroup = props => {
  const { type, objects, label } = props;

  const [overlayVisible, changeOverlayVisibility] = useState(false);

  const options = objects.map(object => (
    <Option
      type={type}
      object={object}
      handleOptionClick={() => props.handleOptionClick(type, object)}
      key={object.id}
    />
  ));

  return (
    <div className="form-group">
      <h2 className="options-label">
        {label}
        <button
          type="button"
          className="add-option-button"
          onClick={() => changeOverlayVisibility(!overlayVisible)}>
          +
        </button>
      </h2>

      {overlayVisible ? (
        <AddOptionOverlay
          type={type}
          label={label}
          handleAddOption={(type, name, color) => props.handleAddOption(type, name, color)}
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
