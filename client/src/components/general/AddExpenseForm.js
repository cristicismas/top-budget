import React, { Component } from 'react';
import { connect } from 'react-redux';
import TYPES from '../../constants/messageTypes';
import './ExpenseModal.css';

import FieldsGroup from './FieldsGroup';

import { addExpense } from '../../store/actions/expenses';

export class AddExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      category: null,
      location: null,
      source: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldClick(type, id) {
    const selectedField = document.getElementById(`${type}-${id}`);

    if (selectedField.classList.contains('selected')) {
      // If field is already selected, unselect it.
      this.setState({ [type]: null });
    } else {
      // If field isn't selected, select it and remove the selected class from other siblings.
      const fieldParent = document.getElementById(type);
      const fieldSiblings = fieldParent.childNodes;

      for (let sibling of fieldSiblings) {
        sibling.classList.remove('selected');
      }

      this.setState({ [type]: id });
    }

    selectedField.classList.toggle('selected');
  }

  clearForm() {
    this.setState({
      value: '',
      category: null,
      location: null,
      source: null
    });

    const selectedFields = document.querySelectorAll('.selected');

    for (let selectedField of selectedFields) {
      selectedField.classList.remove('selected');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (Number(this.state.value) !== 0) {
      const currentTimeAndDate = new Date();
      this.props.addExpense({ ...this.state, date: currentTimeAndDate });

      this.clearForm();
      this.props.closeOverlay();
    } else {
      this.props.addMessage('Please add a value higher than zero.', TYPES.ERROR);
    }
  }

  render() {
    const { categories, locations, sources, user, showAddFieldButton } = this.props;
    const { showCategories, showLocations, showSources } = user.userdata;

    const shouldModalBeLarge =
      (showCategories && categories.length > 3) ||
      (showLocations && locations.length > 3) ||
      (showSources && sources.length > 3);

    const modalStyle = shouldModalBeLarge
      ? {}
      : {
          width: 'auto'
        };

    return (
      <form id="add-expense-form" className="expense-modal" style={modalStyle} method="post" onSubmit={this.handleSubmit}>
        <h2 className="title">Add Expense</h2>

        <div className="form-group">
          <label htmlFor="value-input">
            <h2>Value:</h2>
          </label>
          <br />
          <input
            type="number"
            name="value"
            id="value-input"
            onChange={e => this.setState({ value: e.target.value })}
            value={this.state.value}
            min="0"
            step="0.01"
            required
          />
        </div>

        {showCategories && categories.length > 0 && (
          <FieldsGroup
            type="category"
            objects={categories}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object.id)}
            handleAddFieldClick={type => this.props.handleAddFieldClick(type)}
            showAddFieldButton={showAddFieldButton}
          />
        )}

        {showLocations && locations.length > 0 && (
          <FieldsGroup
            type="location"
            objects={locations}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object.id)}
            handleAddFieldClick={type => this.props.handleAddFieldClick(type)}
            showAddFieldButton={showAddFieldButton}
          />
        )}

        {showSources && sources.length > 0 && (
          <FieldsGroup
            type="source"
            objects={sources}
            handleFieldClick={(type, object) => this.handleFieldClick(type, object.id)}
            handleAddFieldClick={type => this.props.handleAddFieldClick(type)}
            showAddFieldButton={showAddFieldButton}
          />
        )}

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

export default connect(
  mapStateToProps,
  { addExpense }
)(AddExpenseForm);
