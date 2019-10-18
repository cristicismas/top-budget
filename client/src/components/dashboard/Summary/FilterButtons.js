import React from 'react';
import { handleChangeFilter } from '../../../utils/summary';
import FILTERS from '../../../constants/filters';
import './FilterButtons.css';

const FilterButtons = ({ filter, changeFilter }) => {
  const filterButtons = Object.keys(FILTERS).map(filterName => (
    <button
      key={'filter-' + filterName}
      onClick={() => handleChangeFilter(filterName, changeFilter)}
      className={`filter-btn ${filter === filterName ? 'active' : ''}`}>
      {FILTERS[filterName]}
    </button>
  ));

  return <ul id="filters">{filterButtons}</ul>;
};

export default FilterButtons;
