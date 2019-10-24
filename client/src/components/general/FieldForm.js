import React, { useState, useEffect } from 'react';
import { capitalize } from '../../utils/strings';
import './FieldForm.css';

const FieldForm = props => {
  const { type, field } = props;

  // Type is not defined on page refresh, so close the overlay on page refresh.
  if (!type) props.closeOverlay();

  const [name, setName] = useState(field ? field.name : '');
  const [color, setColor] = useState(field ? field.color : '#1e2f87');

  useEffect(() => {
    const fieldNameInput = document.getElementById(`${type}-name`);

    if (fieldNameInput) fieldNameInput.focus();
  });

  const handleSubmit = e => {
    e.preventDefault();
    const fieldNameInput = document.getElementById(`${type}-name`);

    if (name.trim()) {
      const submitData = field ? {
        type,
        id: field.id,
        name,
        color
      } : {
        type,
        name,
        color
      };

      props.handleSubmit(submitData);

      fieldNameInput.setCustomValidity('');

      setName('');
      props.closeOverlay();
    } else {
      fieldNameInput.setCustomValidity('This field is required.');
    }
  };

  const formTitle = field ? `Edit ${capitalize(type)}` : `Add ${capitalize(type)}`;

  return (
    <form id="field-form" method="post" onSubmit={handleSubmit}>
      <h3 className="field-title">{formTitle}</h3>

      <div className="form-group">
        <label htmlFor="field-name">{capitalize(type)}:</label>
        <input
          type="text"
          name="field-name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="field-input"
          placeholder={capitalize(type)}
          id={`${type}-name`}
        />
      </div>

      <div className="form-group">
        <label htmlFor="field-color">Color:</label>
        <input
          type="color"
          name="field-color"
          className="field-input"
          value={color}
          onChange={e => setColor(e.target.value)}
          placeholder={capitalize(type)}
          id={`${type}-color`}
        />
      </div>

      <button className="field-cta" type="submit">
        Confirm
      </button>
    </form>
  );
};

export default FieldForm;
