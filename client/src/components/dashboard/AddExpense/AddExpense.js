import React, { Component } from 'react';
import '../../../css/AddExpense.css';

import OptionsGroup from './OptionsGroup';

export class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
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

    const categories = data.categories.map(category => (
      <div
        className="option"
        onClick={() => {
          this.handleOptionClick('categories', category);
        }}
        key={category.id}
        id={'categories-' + category.id}>
        {category.name}
      </div>
    ));

    const locations = data.locations.map(location => (
      <div
        className="option"
        onClick={() => {
          this.handleOptionClick('locations', location);
        }}
        key={location.id}
        id={'locations-' + location.id}>
        {location.name}
      </div>
    ));

    const sources = data.sources.map(source => (
      <div
        className="option"
        onClick={() => {
          this.handleOptionClick('sources', source);
        }}
        key={source.id}
        id={'sources-' + source.id}>
        {source.name}
      </div>
    ));

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
          type="category"
          options={categories}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
        />

        <OptionsGroup
          label="Location"
          type="location"
          options={locations}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
        />

        <OptionsGroup
          label="Source"
          type="source"
          options={sources}
          handleAddOption={(type, name) => this.handleAddOption(type, name)}
        />

        <button type="submit">Confirm</button>
      </form>
    );
  }
}

export default AddExpense;
