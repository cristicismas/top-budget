import React, { useState } from 'react';
import CURRENCY from '../../../constants/currencies';

const ExpenseSummary = props => {
  const { userdata } = props;
  const { categories, expenses } = props.expenses;

  const [showAllCategories, toggleShowAll] = useState(false);

  let currencySymbol = '';
  if (userdata) {
    currencySymbol = CURRENCY[userdata.currency].symbol
      ? CURRENCY[userdata.currency].symbol
      : userdata.currency;
  }

  const calculateCategoryValue = category => {
    let value = 0;

    expenses.forEach(expense => {
      if (expense.categories[0] === category.id) {
        value += Number(expense.value);
      }
    });

    return value;
  };

  // Reverse sort categories by value
  const sortedCategories = categories.sort((a, b) => {
    return calculateCategoryValue(b) - calculateCategoryValue(a);
  });

  const topCategoryValue = calculateCategoryValue(sortedCategories[0]);

  const calculateBarWidth = categoryValue => {
    const MAX_WIDTH = 150;

    const fillPercentage = (categoryValue * 100) / topCategoryValue;
    const width = MAX_WIDTH / (100 / fillPercentage);

    return width;
  };

  const categoryGroups = sortedCategories.map(category => {
    const categoryValue = calculateCategoryValue(category);
    const barWidth = calculateBarWidth(categoryValue);

    return (
      <div className="category-group" key={`category-group-${category.id}`}>
        <li className="category-label">
          {currencySymbol}
          <div className="category-value">{categoryValue}</div>
          {category.name}
        </li>
        <div
          className="expense-bar"
          style={{
            backgroundColor: category.color,
            width: barWidth ? barWidth : 150
          }}
        />
      </div>
    );
  });

  return (
    <section id="expense-summary">
      <ul className="filters">
        <button className="filter-btn">Week</button>
        <button className="filter-btn">Month</button>
        <button className="filter-btn">Year</button>
      </ul>

      <ul className="summary">
        {showAllCategories ? categoryGroups : categoryGroups.splice(0, 4)}
      </ul>

      <button onClick={() => toggleShowAll(!showAllCategories)} id="show-all">
        Show {showAllCategories ? 'less' : 'all'}
      </button>
    </section>
  );
};

export default ExpenseSummary;
