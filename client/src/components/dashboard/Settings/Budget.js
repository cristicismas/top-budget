import React from 'react';

const Budget = props => (
  <div id="budget" className="settings-group">
    <h2 className="sub-title">Monthly Budget</h2>
    <input
      type="number"
      name="budget-input"
      id="budget-input"
      defaultValue={props.budget}
      onChange={e => props.changeBudget(e.target.value)}
    />
  </div>
);

export default Budget;
