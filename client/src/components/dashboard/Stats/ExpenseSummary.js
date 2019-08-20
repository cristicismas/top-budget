import React, { useState } from 'react';
import '../../../css/ExpenseSummary.css';

import CURRENCY from '../../../constants/currencies';
import FILTERS from '../../../constants/filters';

const ExpenseSummary = props => {
  const { userdata } = props;
  const { categories, expenses } = props.expenses;

  const [showAllCategories, toggleShowAll] = useState(false);

  const lastFilter = localStorage.getItem('lastFilter') ? localStorage.getItem('lastFilter') : FILTERS.WEEK;
  const [filter, changeFilter] = useState(lastFilter);

  const handleChangeFilter = filter => {
    localStorage.setItem('lastFilter', filter);
    changeFilter(filter);
  };

  let currencySymbol = '';
  if (userdata) {
    currencySymbol = CURRENCY[userdata.currency].symbol ? CURRENCY[userdata.currency].symbol : userdata.currency;
  }

  const today = new Date();

  const belongsToTimeline = expense => {
    const expenseDate = new Date(expense.date);

    const diffTime = Math.abs(today.getTime() - expenseDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    var daysToFilter = 0;

    if (FILTERS[filter] === FILTERS.WEEK) daysToFilter = 7;
    else if (FILTERS[filter] === FILTERS.MONTH) daysToFilter = 30;
    else daysToFilter = 356;

    return diffDays < daysToFilter;
  }

  const calculateCategoryValue = category => {
    let value = 0;

    expenses.forEach(expense => {
      if (belongsToTimeline(expense) && (expense.categories[0] === category.id || expense.categories[0] === null)) {
        value += Number(expense.value);
      }
    });

    return value;
  };

  const categoriesAndNotDefined = [...categories, {
    name: 'Not mentioned',
    color: '#888'
  }];

  // Reverse sort categories by value
  const sortedCategories = categoriesAndNotDefined.sort((a, b) => {
    return calculateCategoryValue(b) - calculateCategoryValue(a);
  });

  const topCategoryValue = calculateCategoryValue(sortedCategories[0]);

  const calculateBarWidth = categoryValue => {
    const MAX_WIDTH = 250;

    const fillPercentage = (categoryValue * 100) / topCategoryValue;
    const width = MAX_WIDTH / (100 / fillPercentage);

    return width;
  };

  const filterButtons = Object.keys(FILTERS).map(filterName => (
    <button
      key={'filter-' + filterName}
      onClick={() => handleChangeFilter(filterName)}
      className={`filter-btn ${filter === filterName ? 'active' : ''}`}>
      {FILTERS[filterName]}
    </button>
  ));

  const categoryGroups = sortedCategories.map(category => {
    const categoryValue = calculateCategoryValue(category);
    const barWidth = calculateBarWidth(categoryValue);

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

      <ul className="summary">{showAllCategories ? categoryGroups : categoryGroups.splice(0, 4)}</ul>

      <button onClick={() => toggleShowAll(!showAllCategories)} id="show-all">
        Show {showAllCategories ? 'less' : 'all'}
      </button>
    </section>
  );
};

export default ExpenseSummary;
