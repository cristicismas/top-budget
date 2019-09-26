import React, { useState } from 'react';
import AddOptionForm from './AddOptionForm';
import Overlay from '../Overlay';
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
        <button type="button" className="add-option-button" onClick={() => changeOverlayVisibility(!overlayVisible)}>
          +
        </button>
      </h2>

      {overlayVisible ? (
        <Overlay closeOverlay={() => changeOverlayVisibility(false)}>
          <AddOptionForm
            type={type}
            label={label}
            handleAddOption={(type, name, color) => props.handleAddOption(type, name, color)}
            closeOverlay={() => changeOverlayVisibility(false)}
          />
        </Overlay>
      ) : null}

      <div className="options" id={type}>
        {options}
      </div>
    </div>
  );
};

export default OptionsGroup;
