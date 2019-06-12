import React, { Component } from 'react';
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
    const domElement = document.getElementById(`${type}-${object.id}`);

    if (domElement.classList.contains('selected')) {
      const currentStateArray = [...this.state[type]];
      const indexToRemove = currentStateArray.indexOf(object.id);

      currentStateArray.splice(indexToRemove, 1);

      this.setState({ [type]: currentStateArray });
    } else {
      this.setState({ [type]: [...this.state[type], object.id] });
    }

    domElement.classList.toggle('selected');
  }

  clearForm() {
    this.setState({
      value: 0,
      categories: [],
      locations: [],
      sources: []
    });

    const selectedOptions = document.querySelectorAll('.selected');

    for (let i = 0; i < selectedOptions.length; i++) {
      const currentOption = selectedOptions[i];

      currentOption.classList.remove('selected');
    }
  }

  handleAddOption(type, name) {
    switch (type) {
      case 'category':
        this.props.addCategory({ name });
        break;
      case 'location':
        this.props.addLocation({ name });
        break;
      case 'source':
        this.props.addSource({ name });
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addExpense(this.state);
    this.clearForm();
  }

  render() {
    const data = this.props.expenses;

    const { categories, locations, sources } = data;

    return (
      <form id="expense-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="value">Value:</label>
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

        <OptionsGroup
          label="Category"
          type="categories"
          objects={categories}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <OptionsGroup
          label="Location"
          type="locations"
          objects={locations}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <OptionsGroup
          label="Source"
          type="sources"
          objects={sources}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
          handleOptionClick={(type, object) => this.handleOptionClick(type, object)}
        />

        <button type="submit">Confirm</button>
      </form>
    );
  }
}

export default AddExpense;
