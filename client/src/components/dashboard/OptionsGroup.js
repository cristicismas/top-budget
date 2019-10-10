import React, { useState } from 'react';
import AddFieldModal from './AddFieldModal';
import Overlay from './Overlay';
import Option from './Option';

const OptionsGroup = props => {
  const { type, objects, label } = props;

  const [overlayVisible, changeOverlayVisibility] = useState(false);

  const options = objects.map(object => (
    <Option
      type={type}
      object={object}
      handleOptionClick={() => props.handleOptionClick(type, object)}
      key={`${type}-${object.id}`}
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
          <AddFieldModal
            type={type}
            label={label}
            handleAddField={(type, name, color) => props.handleAddField(type, name, color)}
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
