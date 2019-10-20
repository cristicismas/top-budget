import React, { useState, useCallback } from 'react';
import FIELDS from '../../../constants/fields';
import { getCurrency } from '../../../utils/currency';
import { calculateBarWidth, calculateFieldValue } from '../../../utils/summary';
import './ExpenseSummary.css';

import FilterButtons from './FilterButtons';

const ExpenseSummary = props => {
  const { categories, locations, sources, expenses, userdata, filter, changeFilter } = props;

  const [showAllFields, toggleShowAll] = useState(false);

  const currencySymbol = getCurrency(userdata);

  let fields, fieldType;

  switch (userdata.primaryField) {
    case FIELDS.CATEGORIES:
      fields = categories;
      fieldType = 'category';
      break;
    case FIELDS.LOCATIONS:
      fields = locations;
      fieldType = 'location';
      break;
    case FIELDS.SOURCES:
      fields = sources;
      fieldType = 'source';
      break;
    default:
      fields = null;
      fieldType = undefined;
  }

  const fieldsAndNotDefined = [
    ...fields,
    {
      name: 'Not specified',
      color: '#888'
    }
  ];

  // Reverse sort fields by value
  const sortedFields = useCallback(
    fieldsAndNotDefined.sort((a, b) => {
      return calculateFieldValue(b, fieldType, expenses, filter) - calculateFieldValue(a, fieldType, expenses, filter);
    }),
    [fieldsAndNotDefined, fieldType, expenses, filter]
  );

  const topFieldValue = useCallback(calculateFieldValue(sortedFields[0], fieldType, expenses, filter), [
    sortedFields,
    fieldType,
    expenses,
    filter
  ]);

  const fieldGroups = sortedFields.map(field => {
    const fieldValue = calculateFieldValue(field, fieldType, expenses, filter);
    const barWidth = calculateBarWidth(fieldValue, topFieldValue);

    if (!fieldValue) return null;

    return (
      <div className="field-group" key={`field-group-${field.id}`}>
        <li className="field-label">
          {currencySymbol}
          <div className="field-value">{fieldValue}</div>
          {field.name}
        </li>
        <div
          className="expense-bar"
          style={{
            backgroundColor: field.color,
            width: !isNaN(barWidth) ? barWidth : 250
          }}
        />
      </div>
    );
  });

  let fieldGroupsLength = 0;

  fieldGroups.forEach(field => {
    if (field) fieldGroupsLength += 1;
  });

  return (
    <section id="expense-summary">
      <FilterButtons filter={filter} changeFilter={changeFilter} />

      <ul className="summary">{showAllFields ? fieldGroups : fieldGroups.slice(0, 4)}</ul>

      {fieldGroupsLength > 4 ? (
        <button onClick={() => toggleShowAll(!showAllFields)} id="show-all">
          Show {showAllFields ? 'less' : 'all'}
        </button>
      ) : null}
    </section>
  );
};

export default ExpenseSummary;
