import React, { Component } from 'react';
import { connect } from 'react-redux';
import TYPES from '../../../constants/messageTypes';
import './AddExpenseForm.css';

import OptionsGroup from '../OptionsGroup';

import { addExpense } from '../../../store/actions/expenses';
import { addCategory } from '../../../store/actions/categories';
import { addLocation } from '../../../store/actions/locations';
import { addSource } from '../../../store/actions/sources';

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

  handleAddField(type, name, color) {
    switch (type) {
      case 'category':
        this.props.addCategory({ name, color });
        break;
      case 'location':
        this.props.addLocation({ name, color });
        break;
      case 'source':
        this.props.addSource({ name, color });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (Number(this.state.value) !== 0) {
      const currentTimeAndDate = new Date();
      this.props.addExpense({ ...this.state, date: currentTimeAndDate });

      this.clearForm();
    } else {
      this.clearForm();
      this.props.addMessage('Please add a value higher than zero.', TYPES.ERROR);
    }
  }

  render() {
    const { categories, locations, sources, user } = this.props;
    const { showCategories, showLocations, showSources } = user.userdata ? user.userdata : {};

    return (
      <form id="expense-form" onSubmit={this.handleSubmit}>
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

        {showCategories && (
          <OptionsGroup
            label="Category"
            type="category"
            objects={categories}
            handleAddField={(type, name, color) => this.handleAddField(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
          />
        )}

        {showLocations && (
          <OptionsGroup
            label="Location"
            type="location"
            objects={locations}
            handleAddField={(type, name, color) => this.handleAddField(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
          />
        )}

        {showSources && (
          <OptionsGroup
            label="Source"
            type="source"
            objects={sources}
            handleAddField={(type, name, color) => this.handleAddField(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object.id)}
          />
        )}

        <button id="add-expense-btn" type="submit">
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

const mapDispatchToProps = {
  addExpense,
  addCategory,
  addLocation,
  addSource
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpenseForm);
