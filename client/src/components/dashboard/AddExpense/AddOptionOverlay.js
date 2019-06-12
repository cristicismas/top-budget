import React, { useEffect } from 'react';
import '../../../css/AddOptionOverlay.css';

function AddOptionOverlay(props) {
  const { type, label } = props;

  useEffect(() => {
    document.getElementById(`add-${type}-input`).focus();
  });

  return (
    <div className="overlay-container">
      <div className="overlay">
        <button
          type="button"
          className="close-overlay-btn"
          onClick={() => props.closeOverlay()}>
          ✕
        </button>

        <h3 className="overlay-title">Add {label}</h3>
        <input
          type="text"
          name="add-option"
          className="overlay-input"
          placeholder={label}
          id={`add-${type}-input`}
        />

        <button
          className="overlay-cta"
          type="button"
          onClick={() => {
            const input = document.getElementById(`add-${type}-input`);

            const optionName = input.value;

            if (optionName.trim()) {
              props.handleAddOption(type, optionName);
              input.setCustomValidity('');

              document.getElementById(`add-${type}-input`).value = '';
              props.closeOverlay();
            } else {
              input.setCustomValidity('This field is required.');
            }
          }}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AddOptionOverlay;
