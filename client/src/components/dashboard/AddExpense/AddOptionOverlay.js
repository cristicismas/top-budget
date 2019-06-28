import React, { useEffect } from 'react';
import '../../../css/AddOptionOverlay.css';

const AddOptionOverlay = props => {
  const { type, label } = props;

  useEffect(() => {
    document.getElementById(`${type}-name`).focus();
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

        <label htmlFor="option-name">{label}:</label>
        <input
          type="text"
          name="option-name"
          className="overlay-input"
          placeholder={label}
          id={`${type}-name`}
        />

        <label htmlFor="option-color">Color:</label>
        <input
          type="color"
          name="option-color"
          className="overlay-input"
          defaultValue="#15131A"
          placeholder={label}
          id={`${type}-color`}
        />

        <button
          className="overlay-cta"
          type="button"
          onClick={() => {
            const nameInput = document.getElementById(`${type}-name`);
            const colorInput = document.getElementById(`${type}-color`);

            const optionName = nameInput.value;
            const optionColor = colorInput.value;

            if (optionName.trim()) {
              props.handleAddOption(type, optionName, optionColor);
              nameInput.setCustomValidity('');

              document.getElementById(`${type}-name`).value = '';
              props.closeOverlay();
            } else {
              nameInput.setCustomValidity('This field is required.');
            }
          }}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AddOptionOverlay;
