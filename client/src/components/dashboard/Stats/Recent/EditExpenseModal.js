import React, { useState, useEffect } from 'react';
import TYPES from '../../../../constants/messageTypes';
import '../../../../css/EditExpenseModal.css';

import OptionsGroup from '../../OptionsGroup';

const EditExpenseField = props => {
  const { categories, locations, sources, expense } = props;
  const { showCategories, showLocations, showSources } = props.userdata;

  const [selectedCategory, setCategory] = useState(expense.category);
  const [selectedLocation, setLocation] = useState(expense.location);
  const [selectedSource, setSource] = useState(expense.source);
  const [newValue, setValue] = useState(expense.value);

  useEffect(() => {
    document.getElementById('value-input').focus();
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if (Number(newValue) <= 0) {
      props.addMessage('Please add a value higher than zero.', TYPES.ERROR);
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

  const handleOptionClick = (type, id) => {
    let setSelectedField = null;

    // Get the right setSelectedField function
    if (type === 'category') setSelectedField = setCategory;
    else if (type === 'location') setSelectedField = setLocation;
    else setSelectedField = setSource;

    const selectedOption = document.getElementById(`${type}-${id}`);

    // If option is already selected, unselect it.
    if (selectedOption) {
      if (selectedOption.classList.contains('selected')) {
        setSelectedField(null);
      } else {
        const optionParent = document.getElementById(type);
        const optionSiblings = optionParent.childNodes;
  
        for (let i = 0; i < optionSiblings.length; i++) {
          optionSiblings[i].classList.remove('selected');
        }
  
        setSelectedField(id);
      }
  
      selectedOption.classList.toggle('selected');
    }
  }

  useEffect(() => {
    handleOptionClick('category', expense.category);
    handleOptionClick('location', expense.location);
    handleOptionClick('source', expense.source);
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
          handleAddField={() => {}}
          handleOptionClick={(type, object) => handleOptionClick(type, object.id)}
        />
      )}

      {showLocations && (
        <OptionsGroup
          label="Location"
          type="location"
          objects={locations}
          handleAddField={() => {}}
          handleOptionClick={(type, object) => handleOptionClick(type, object.id)}
        />
      )}

      {showSources && (
        <OptionsGroup
          label="Source"
          type="source"
          objects={sources}
          handleAddField={() => {}}
          handleOptionClick={(type, object) => handleOptionClick(type, object.id)}
        />
      )}

      <button type="submit" id="save-edited-expense">
        Save Changes
      </button>
    </form>
  );
};

export default EditExpenseField;
