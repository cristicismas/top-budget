import React, { Component } from 'react';
import '../../css/AddExpense.css';

export class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      categories: [],
      locations: [],
      sources: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getExpenses();
    this.props.getCategories();
    this.props.getLocations();
    this.props.getSources();
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

  handleSubmit(e) {
    e.preventDefault();

    this.props.addExpense(this.state);
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
            id="value"
            onChange={e => this.setState({ value: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="options" id="categories">
            {categories}
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <div className="options" id="locations">
            {locations}
          </div>
        </div>

        <div className="form-group">
          <label>Source</label>
          <div className="options" id="sources">
            {sources}
          </div>
        </div>

        <button type="submit">Confirm</button>
      </form>
    );
  }
}

export default AddExpense;
