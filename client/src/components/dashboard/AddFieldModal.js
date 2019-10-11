import React, { useEffect } from 'react';
import '../../css/AddFieldModal.css';

const AddFieldModal = props => {
  const { type, label } = props;

  useEffect(() => {
    document.getElementById(`${type}-name`).focus();
  });

  const handleSubmit = () => {
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
    <section id="add-field-form">
      <h3 className="add-field-title">Add {label}</h3>

      <label htmlFor="field-name">{label}:</label>
      <input type="text" name="field-name" className="add-field-input" placeholder={label} id={`${type}-name`} />

      <label htmlFor="field-color">Color:</label>
      <input
        type="color"
        name="field-color"
        className="add-field-input"
        defaultValue="#15131A"
        placeholder={label}
        id={`${type}-color`}
      />

      <button
        className="add-field-cta"
        type="button"
        onClick={handleSubmit}>
        Confirm
      </button>
    </section>
  );
};

export default AddFieldModal;
