import React, { Component } from 'react';
import '../../css/AddExpense.css';

export class AddExpense extends Component {
  componentDidMount() {
    this.props.getExpenses();
    this.props.getCategories();
    this.props.getLocations();
    this.props.getSources();
  }

  render() {
    const data = this.props.expenses;

    const categories = data.categories.map(category => 
      <div className="option" key={category.id}>{category.name}</div>
    );

    const locations = data.locations.map(location => 
      <div className="option" key={location.id}>{location.name}</div>
    );

    const sources = data.sources.map(source => 
      <div className="option" key={source.id}>{source.name}</div>
    );

    return (
      <form id="expense-form">
        <div className="form-group">
          <label htmlFor="value">Value:</label>
          <br />
          <input type="number" name="value" id="value" required />
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
