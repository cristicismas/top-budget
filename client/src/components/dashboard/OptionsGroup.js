import React, { Fragment, useState } from 'react';

function OptionsGroup(props) {
  const { type, options, label } = props;

  const [inputVisible, changeInputVisibility] = useState(false);

  return (
    <div className="form-group">
      <label>
        {label}
        <button
          className="add-option-button"
          onClick={() => changeInputVisibility(!inputVisible)}>
          +
        </button>
      </label>

      {inputVisible ? (
        <Fragment>
          <label htmlFor="add-option" className="add-option-label">
            Add {label}
          </label>
          <input
            type="text"
            name="add-option"
            className="add-option-input"
            id={`add-${type}-input`}
          />
          
          <button
            className="add-option-confirm"
            onClick={() => {
              const optionName = document.getElementById(`add-${type}-input`).value;

              props.handleAddOption(type, optionName);

              document.getElementById(`add-${type}-input`).value = '';
              changeInputVisibility(false);
            }}>
            Confirm
          </button>
        </Fragment>
      ) : null}

      <div className="options" id={type}>
        {options}
      </div>
    </div>
  );
}

export default OptionsGroup;
