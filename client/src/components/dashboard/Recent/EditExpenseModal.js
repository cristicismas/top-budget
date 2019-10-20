import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TYPES from '../../../constants/messageTypes';
import '../../general/ExpenseModal.css';

import FieldsGroup from '../../general/FieldsGroup';

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

  const handleFieldClick = (type, id) => {
    let setSelectedField = null;

    // Get the right setSelectedField function
    if (type === 'category') setSelectedField = setCategory;
    else if (type === 'location') setSelectedField = setLocation;
    else setSelectedField = setSource;

    const selectedField = document.getElementById(`${type}-${id}`);

    // If field is already selected, unselect it.
    if (selectedField) {
      if (selectedField.classList.contains('selected')) {
        setSelectedField(null);
      } else {
        const fieldParent = document.getElementById(type);
        const fieldSiblings = fieldParent.childNodes;

        for (let sibling of fieldSiblings) {
          sibling.classList.remove('selected');
        }

        setSelectedField(id);
      }

      selectedField.classList.toggle('selected');
    }
  };

  useEffect(() => {
    handleFieldClick('category', expense.category);
    handleFieldClick('location', expense.location);
    handleFieldClick('source', expense.source);
  }, [expense]);

  const shouldModalBeLarge =
    (showCategories && categories.length > 3) ||
    (showLocations && locations.length > 3) ||
    (showSources && sources.length > 3);

  const modalStyle = shouldModalBeLarge
    ? {}
    : {
        width: 'auto'
      };

  if (expense.id === null) return <Redirect to="/dashboard" />;

  return (
    <form id="edit-expense-modal" className="expense-modal" style={modalStyle} onSubmit={e => handleSubmit(e)}>
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

      {showCategories && categories.length > 0 && (
        <FieldsGroup
          label="Category"
          type="category"
          objects={categories}
          handleAddField={() => {}}
          handleFieldClick={(type, object) => handleFieldClick(type, object.id)}
        />
      )}

      {showLocations && locations.length > 0 && (
        <FieldsGroup
          label="Location"
          type="location"
          objects={locations}
          handleAddField={() => {}}
          handleFieldClick={(type, object) => handleFieldClick(type, object.id)}
        />
      )}

      {showSources && sources.length > 0 && (
        <FieldsGroup
          label="Source"
          type="source"
          objects={sources}
          handleAddField={() => {}}
          handleFieldClick={(type, object) => handleFieldClick(type, object.id)}
        />
      )}

      <button type="submit" className="submit-btn">
        Save Changes
      </button>
    </form>
  );
};

export default EditExpenseField;
