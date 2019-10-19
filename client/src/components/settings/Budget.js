import React from 'react';
import './Budget.css';

const Budget = props => (
  <section id="budget">
    <h2 className="sub-title">Monthly Budget</h2>
    <input
      type="number"
      name="budget-input"
      id="budget-input"
      value={props.budget}
      onChange={e => props.changeBudget(e.target.value)}
    />
  </section>
);

export default Budget;
