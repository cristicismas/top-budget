import React, { useState } from 'react';
import { getCurrency } from '../../../utils/currency';
import { handleChangeFilter, calculateBarWidth, calculateCategoryValue } from '../../../utils/summary';
import '../../../css/ExpenseSummary.css';

import FILTERS from '../../../constants/filters';

const ExpenseSummary = props => {
  const { userdata, filter, changeFilter } = props;
  const { categories, expenses } = props.expenses;

  const [showAllCategories, toggleShowAll] = useState(false);

  const currencySymbol = getCurrency(userdata);

  const categoriesAndNotDefined = [
    ...categories,
    {
      name: 'Not specified',
      color: '#888'
    }
  ];

  // Reverse sort categories by value
  const sortedCategories = categoriesAndNotDefined.sort((a, b) => {
    return calculateCategoryValue(b, expenses, filter) - calculateCategoryValue(a, expenses, filter);
  });

  const topCategoryValue = calculateCategoryValue(sortedCategories[0], expenses, filter);

  const filterButtons = Object.keys(FILTERS).map(filterName => (
    <button
      key={'filter-' + filterName}
      onClick={() => handleChangeFilter(filterName, changeFilter)}
      className={`filter-btn ${filter === filterName ? 'active' : ''}`}>
      {FILTERS[filterName]}
    </button>
  ));

  const categoryGroups = sortedCategories.map(category => {
    const categoryValue = calculateCategoryValue(category, expenses, filter);
    const barWidth = calculateBarWidth(categoryValue, topCategoryValue);

    if (!categoryValue) return null;

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
            width: !isNaN(barWidth) ? barWidth : 250
          }}
        />
      </div>
    );
  });

  let categoryGroupsLength = 0;

  categoryGroups.forEach(category => {
    if (category) categoryGroupsLength += 1;
  });

  return (
    <section id="expense-summary">
      <ul className="filters">{filterButtons}</ul>

      <ul className="summary">{showAllCategories ? categoryGroups : categoryGroups.slice(0, 4)}</ul>

      {categoryGroupsLength > 4 ? (
        <button onClick={() => toggleShowAll(!showAllCategories)} id="show-all">
          Show {showAllCategories ? 'less' : 'all'}
        </button>
      ) : null}
    </section>
  );
};

export default ExpenseSummary;
