import React, { useState, useEffect } from 'react';
import { capitalize } from '../../utils/strings';
import './AddFieldForm.css';

const AddFieldForm = props => {
  const { type } = props;

  const [name, setName] = useState('');
  const [color, setColor] = useState('#1e2f87');

  useEffect(() => {
    const fieldNameInput = document.getElementById(`${type}-name`);

    if (fieldNameInput) fieldNameInput.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    const fieldNameInput = document.getElementById(`${type}-name`);

    if (name.trim()) {
      props.handleAddField(type, name, color);
      fieldNameInput.setCustomValidity('');

      setName('');
      props.closeOverlay();
    } else {
      fieldNameInput.setCustomValidity('This field is required.');
    }
  };

  return (
    <form id="add-field-form" method="post" onSubmit={handleSubmit}>
      <h3 className="add-field-title">Add {capitalize(type)}</h3>

      <div className="form-group">
        <label htmlFor="field-name">{capitalize(type)}:</label>
        <input
          type="text"
          name="field-name"
          value={name}
          onChange={e => setName(e.target.value)}
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
          value={color}
          onChange={e => setColor(e.target.value)}
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
