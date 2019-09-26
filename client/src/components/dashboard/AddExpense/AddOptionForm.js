import React, { useEffect } from 'react';
import '../../../css/AddOptionForm.css';

const AddOptionForm = props => {
  const { type, label } = props;

  useEffect(() => {
    document.getElementById(`${type}-name`).focus();
  });

  const handleSubmit = () => {
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
  };

  return (
    <section id="add-option-form">
      <h3 className="add-option-title">Add {label}</h3>

      <label htmlFor="option-name">{label}:</label>
      <input type="text" name="option-name" className="add-option-input" placeholder={label} id={`${type}-name`} />

      <label htmlFor="option-color">Color:</label>
      <input
        type="color"
        name="option-color"
        className="add-option-input"
        defaultValue="#15131A"
        placeholder={label}
        id={`${type}-color`}
      />

      <button
        className="add-option-cta"
        type="button"
        onClick={handleSubmit}>
        Confirm
      </button>
    </section>
  );
};

export default AddOptionForm;
