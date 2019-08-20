import React, { Component } from 'react';
import TYPES from '../../../constants/messageTypes';
import '../../../css/AddExpense.css';

import OptionsGroup from './OptionsGroup';

export class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      categories: [],
      locations: [],
      sources: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById('value-input').focus();
  }

  handleOptionClick(type, object) {
    const options = document.getElementById(`${type}-${object.id}`);

    if (options.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    options.classList.toggle('selected');
  }

  clearForm() {
    this.setState({
      value: '',
      categories: [],
      locations: [],
      sources: []
    });

    const selectedOptions = document.querySelectorAll('.selected');

    for (let i = 0; i < selectedOptions.length; i++) {
      const currentOption = selectedOptions[i];

      currentOption.classList.remove('selected');
    }

    document.getElementById('value-input').focus();
  }

  handleAddOption(type, name, color) {
    switch (type) {
      case 'categories':
        this.props.addCategory({ name, color });
        break;
      case 'locations':
        this.props.addLocation({ name, color });
        break;
      case 'sources':
        this.props.addSource({ name, color });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const currentTimeAndDate = new Date();
    this.props.addExpense({...this.state, date: currentTimeAndDate});

    this.clearForm();
    this.props.setMessage('Expense added with success', TYPES.SUCCESS);
  }

  render() {
    const { expenses, user } = this.props;
    const { categories, locations, sources } = expenses;
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
            type="categories"
            objects={categories}
            handleAddOption={(type, name, color) => this.handleAddOption(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
          />
        )}

        {showLocations && (
          <OptionsGroup
            label="Location"
            type="locations"
            objects={locations}
            handleAddOption={(type, name, color) => this.handleAddOption(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
          />
        )}

        {showSources && (
          <OptionsGroup
            label="Source"
            type="sources"
            objects={sources}
            handleAddOption={(type, name, color) => this.handleAddOption(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
          />
        )}

        <button type="submit">Confirm</button>
      </form>
    );
  }
}

export default AddExpense;
