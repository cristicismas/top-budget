import React, { useState, useEffect } from 'react';
import TYPES from '../../../../constants/messageTypes';
import '../../../../css/EditExpenseModal.css';

import OptionsGroup from '../../AddExpense/OptionsGroup';

const EditExpenseField = props => {
  const { categories, locations, sources, expense } = props;
  const { showCategories, showLocations, showSources } = props.userdata;

  const [selectedCategory, setCategory] = useState(expense.category);
  const [selectedLocation, setLocation] = useState(expense.location);
  const [selectedSource, setSource] = useState(expense.source);
  const [newValue, setValue] = useState(expense.value);

  const handleSubmit = e => {
    e.preventDefault();

    if (Number(newValue) <= 0) {
      props.setMessage('Please add a value higher than zero.', TYPES.ERROR);
    } else {
      const editedExpense = {
        id: expense.id,
        category: selectedCategory,
        location: selectedLocation,
        source: selectedSource,
        value: newValue
      };

      props.editExpense(editedExpense);
      props.closeOverlay();
    }
  };

  const toggleOption = (type, id) => {
    if (type === 'category') setCategory(id);
    if (type === 'location') setLocation(id);
    if (type === 'source') setSource(id);

    const selectedOption = document.getElementById(`${type}-${id}`);

    let isOptionAlreadySelected = false;
    if (selectedOption && selectedOption.classList.contains('selected')) isOptionAlreadySelected = true;

    const optionParent = document.getElementById(type);
    const optionSiblings = optionParent.childNodes;

    for (let i = 0; i < optionSiblings.length; i++) {
      optionSiblings[i].classList.remove('selected');
    }

    if (selectedOption) {
      if (isOptionAlreadySelected) {
        selectedOption.classList.remove('selected');
        if (type === 'category') setCategory(null);
        if (type === 'location') setLocation(null);
        if (type === 'source') setSource(null);
      } else {
        selectedOption.classList.add('selected');
      }
    }
  };

  useEffect(() => {
    toggleOption('category', expense.category);
    toggleOption('location', expense.location);
    toggleOption('source', expense.source);
  }, [expense]);

  return (
    <form id="edit-expense-modal" onSubmit={e => handleSubmit(e)}>
      <h2 className="title">Edit Expense</h2>

      <div className="form-group">
        <label htmlFor="value-input">
          <h2>Value:</h2>
        </label>
        <br />
        <input
          type="number"
          name="value"
          id="value-input"
          onChange={e => setValue(e.target.value)}
          value={newValue}
          min="0"
          step="0.01"
          required
        />
      </div>

      {showCategories && (
        <OptionsGroup
          label="Category"
          type="category"
          objects={categories}
          handleAddOption={() => {}}
          handleOptionClick={(type, object) => toggleOption(type, object.id)}
        />
      )}

      {showLocations && (
        <OptionsGroup
          label="Location"
          type="location"
          objects={locations}
          handleAddOption={() => {}}
          handleOptionClick={(type, object) => toggleOption(type, object.id)}
        />
      )}

      {showSources && (
        <OptionsGroup
          label="Source"
          type="source"
          objects={sources}
          handleAddOption={() => {}}
          handleOptionClick={(type, object) => toggleOption(type, object.id)}
        />
      )}

      <button type="submit" id="save-edited-expense">
        Save Changes
      </button>
    </form>
  );
};

export default EditExpenseField;
