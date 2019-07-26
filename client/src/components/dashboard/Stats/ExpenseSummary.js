import React from 'react';

const ExpenseSummary = () => {
  return (
    <section id="expense-summary">
      <ul className="filters">
        <button className="filter-btn">Week</button>
        <button className="filter-btn">Month</button>
        <button className="filter-btn">Year</button>
      </ul>

      <ul className="summary">
        <div className="category-group">
          <li className="category-label">
            $
            <div className="category-value">165</div>
            Work
          </li>
          <div className="expense-bar" />
        </div>

        <div className="category-group">
          <li className="category-label">
            $
            <div className="category-value">120</div>
            Household
          </li>
          <div className="expense-bar" />
        </div>

        <div className="category-group">
          <li className="category-label">
            $
            <div className="category-value">200</div>
            Food
          </li>
          <div className="expense-bar" />
        </div>

        <div className="category-group">
          <li className="category-label">
            $
            <div className="category-value">35</div>
            Icecream
          </li>
          <div className="expense-bar" />
        </div>
      </ul>

      <button id="show-all">Show all</button>
    </section>
  );
};

export default ExpenseSummary;
