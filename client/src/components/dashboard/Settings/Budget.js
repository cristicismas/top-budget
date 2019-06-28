import React, { useState } from 'react';

const Budget = () => {
  const [budget, setBudget] = useState(500);

  const handleChange = e => {
    setBudget(e.target.value);
  }

  return (
    <div id="budget" className="settings-group">
      <h2 className="sub-title">Monthly Budget</h2>
      <input
        type="number"
        name="budget-input"
        id="budget-input"
        defaultValue={budget}
        onChange={handleChange}
      />
    </div>
  );
};

export default Budget;
