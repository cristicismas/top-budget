import React, { useState } from 'react';
import { getCurrency } from '../../../utils/currency';
import '../../../css/ExpenseSummary.css';

import FILTERS from '../../../constants/filters';

const handleChangeFilter = (filter, changeFilter) => {
  localStorage.setItem('lastFilter', filter);
  changeFilter(filter);
};

const today = new Date();

const belongsToTimeline = (expense, filter) => {
  const expenseDate = new Date(expense.date);

  const diffTime = Math.abs(today.getTime() - expenseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  var daysToFilter = 0;

  if (FILTERS[filter] === FILTERS.WEEK) daysToFilter = 7;
  else if (FILTERS[filter] === FILTERS.MONTH) daysToFilter = 30;
  else daysToFilter = 356;

  return diffDays < daysToFilter;
};

const calculateBarWidth = (categoryValue, topCategoryValue) => {
  const MAX_WIDTH = 250;

  const fillPercentage = (categoryValue * 100) / topCategoryValue;
  const width = MAX_WIDTH / (100 / fillPercentage);

  return width;
};

const ExpenseSummary = props => {
  const { userdata } = props;
  const { categories, expenses } = props.expenses;

  const [showAllCategories, toggleShowAll] = useState(false);

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : FILTERS.WEEK;
  const [filter, changeFilter] = useState(lastFilter);

  const currencySymbol = getCurrency(userdata);

  const calculateCategoryValue = category => {
    let value = 0;

    expenses.forEach(expense => {
      if (
        belongsToTimeline(expense, filter) &&
        (expense.categories[0] === category.id || expense.categories[0] === null)
      ) {
        value += Number(expense.value);
      }
    });

    return value;
  };

  const categoriesAndNotDefined = [
    ...categories,
    {
      name: 'Not mentioned',
      color: '#888'
    }
  ];

  // Reverse sort categories by value
  const sortedCategories = categoriesAndNotDefined.sort((a, b) => {
    return calculateCategoryValue(b) - calculateCategoryValue(a);
  });

  const topCategoryValue = calculateCategoryValue(sortedCategories[0]);

  const filterButtons = Object.keys(FILTERS).map(filterName => (
    <button
      key={'filter-' + filterName}
      onClick={() => handleChangeFilter(filterName, changeFilter)}
      className={`filter-btn ${filter === filterName ? 'active' : ''}`}>
      {FILTERS[filterName]}
    </button>
  ));

  const categoryGroups = sortedCategories.map(category => {
    const categoryValue = calculateCategoryValue(category);
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

  return (
    <section id="expense-summary">
      <ul className="filters">{filterButtons}</ul>

      <ul className="summary">{showAllCategories ? categoryGroups : categoryGroups.slice(0, 4)}</ul>

      {categoryGroups.length > 4 ? (
        <button onClick={() => toggleShowAll(!showAllCategories)} id="show-all">
          Show {showAllCategories ? 'less' : 'all'}
        </button>
      ) : null}
    </section>
  );
};

export default ExpenseSummary;
