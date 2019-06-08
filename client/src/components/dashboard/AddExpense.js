import React, { Component } from 'react';
import '../../css/AddExpense.css';

export class AddExpense extends Component {
  render() {
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
            <div className="option">Groceries</div>
            <div className="option">Snacks</div>
            <div className="option">Transport</div>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <div className="options" id="locations">
            <div className="option">Walmart</div>
            <div className="option">Target</div>
            <div className="option">Best Buy</div>
          </div>
        </div>

        <div className="form-group">
          <label>Source</label>
          <div className="options" id="sources">
            <div className="option">MasterCard</div>
            <div className="option">Visa</div>
            <div className="option">Cash</div>
          </div>
        </div>

        <button type="submit">Confirm</button>
      </form>
    );
  }
}

export default AddExpense;
