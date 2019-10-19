import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TYPES from '../../../constants/messageTypes';
import '../ExpenseModal.css';

import OptionsGroup from '../../general/OptionsGroup';

const EditExpenseField = props => {
  const { categories, locations, sources } = props;
  const { showCategories, showLocations, showSources } = props.userdata;

  const expense = props.expense
    ? props.expense
    : {
        id: null,
        value: null,
        date: null,
        category: null,
        location: null,
        source: null
      };

  const [selectedCategory, setCategory] = useState(expense.category);
  const [selectedLocation, setLocation] = useState(expense.location);
  const [selectedSource, setSource] = useState(expense.source);
  const [newValue, setValue] = useState(expense.value);

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
  };

  useEffect(() => {
    handleOptionClick('category', expense.category);
    handleOptionClick('location', expense.location);
    handleOptionClick('source', expense.source);
  }, [expense]);

  if (expense.id === null) return <Redirect to="/dashboard" />;

  return (
    <form id="edit-expense-modal" className="expense-modal" onSubmit={e => handleSubmit(e)}>
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

      <button type="submit" className="submit-btn">
        Save Changes
      </button>
    </form>
  );
};

export default EditExpenseField;
