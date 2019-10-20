import React, { useEffect } from 'react';
import { capitalize } from '../../utils/strings';
import './AddFieldForm.css';

const AddFieldForm = props => {
  const { type } = props;

  useEffect(() => {
    const fieldNameInput = document.getElementById(`${type}-name`);

    if (fieldNameInput) fieldNameInput.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    
    const nameInput = document.getElementById(`${type}-name`);
    const colorInput = document.getElementById(`${type}-color`);

    const fieldName = nameInput.value;
    const fieldColor = colorInput.value;

    if (fieldName.trim()) {
      props.handleAddField(type, fieldName, fieldColor);
      nameInput.setCustomValidity('');

      document.getElementById(`${type}-name`).value = '';
      props.closeOverlay();
    } else {
      nameInput.setCustomValidity('This field is required.');
    }
  };

  return (
    <form id="add-field-form" onSubmit={handleSubmit}>
      <h3 className="add-field-title">Add {capitalize(type)}</h3>

      <div className="form-group">
        <label htmlFor="field-name">{capitalize(type)}:</label>
        <input
          type="text"
          name="field-name"
          className="add-field-input"
          placeholder={capitalize(type)}
          id={`${type}-name`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="field-color">Color:</label>
        <input
          type="color"
          name="field-color"
          className="add-field-input"
          defaultValue="#1e2f87"
          placeholder={capitalize(type)}
          id={`${type}-color`}
        />
      </div>

      <button className="add-field-cta" type="submit">
        Confirm
      </button>
    </form>
  );
};

export default AddFieldForm;
