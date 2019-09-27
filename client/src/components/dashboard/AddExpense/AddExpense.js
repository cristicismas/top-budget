import React, { Component } from 'react';
import TYPES from '../../../constants/messageTypes';
import '../../../css/AddExpense.css';

import OptionsGroup from './OptionsGroup';

export class AddExpense extends Component {
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

  componentDidMount() {
    document.getElementById('value-input').focus();
  }

  handleOptionClick(type, object) {
    const option = document.getElementById(`${type}-${object.id}`);

    if (option.classList.contains('selected')) {
      // If option is already selected, unselect it.
      this.setState({ [type]: null });
    } else {
      // If option isn't selected, select it and remove the selected class from other siblings.
      const optionParent = document.getElementById(type);
      const optionSiblings = optionParent.childNodes;

      for (let i = 0; i < optionSiblings.length; i++) {
        optionSiblings[i].classList.remove('selected');
      }

      this.setState({ [type]: object.id });
    }

    option.classList.toggle('selected');
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

    document.getElementById('value-input').focus();
  }

  handleAddOption(type, name, color) {
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
      this.props.addExpense({...this.state, date: currentTimeAndDate});
  
      this.clearForm();
      this.props.setMessage('Expense added with success.', TYPES.SUCCESS);
    } else {
      this.clearForm();
      this.props.setMessage('Please add a value higher than zero.', TYPES.ERROR);
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
            handleAddOption={(type, name, color) => this.handleAddOption(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
          />
        )}

        {showLocations && (
          <OptionsGroup
            label="Location"
            type="location"
            objects={locations}
            handleAddOption={(type, name, color) => this.handleAddOption(type, name, color)}
            handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
          />
        )}

        {showSources && (
          <OptionsGroup
            label="Source"
            type="source"
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
