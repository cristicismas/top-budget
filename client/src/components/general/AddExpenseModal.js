import React, { Component } from 'react';
import { connect } from 'react-redux';
import TYPES from '../../constants/messageTypes';
import './ExpenseModal.css';

import OptionsGroup from './OptionsGroup';

import { addExpense } from '../../store/actions/expenses';

export class AddExpenseModal extends Component {
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

  handleOptionClick(type, id) {
    const selectedOption = document.getElementById(`${type}-${id}`);

    if (selectedOption.classList.contains('selected')) {
      // If option is already selected, unselect it.
      this.setState({ [type]: null });
    } else {
      // If option isn't selected, select it and remove the selected class from other siblings.
      const optionParent = document.getElementById(type);
      const optionSiblings = optionParent.childNodes;

      for (let i = 0; i < optionSiblings.length; i++) {
        optionSiblings[i].classList.remove('selected');
      }

      this.setState({ [type]: id });
    }

    selectedOption.classList.toggle('selected');
  }

  clearForm() {
    this.setState({
      value: '',
      category: null,
      location: null,
      source: null
    });

    const selectedOptions = document.querySelectorAll('.selected');

    for (let i = 0; i < selectedOptions.length; i++) {
      const currentOption = selectedOptions[i];

      currentOption.classList.remove('selected');
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
    const { categories, locations, sources, user } = this.props;
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
      <form id="add-expense-modal" className="expense-modal" style={modalStyle} onSubmit={this.handleSubmit}>
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
          <OptionsGroup
            label="Category"
            type="category"
            objects={categories}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
          />
        )}

        {showLocations && locations.length > 0 && (
          <OptionsGroup
            label="Location"
            type="location"
            objects={locations}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
          />
        )}

        {showSources && sources.length > 0 && (
          <OptionsGroup
            label="Source"
            type="source"
            objects={sources}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
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
)(AddExpenseModal);
