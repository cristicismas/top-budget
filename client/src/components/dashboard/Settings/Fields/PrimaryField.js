import React from 'react';
import FIELDS from '../../../../constants/fields';
import ICON from '../../../../constants/icons';

const PrimaryField = props => {
  const currencyOptions = Object.keys(FIELDS).map(field => (
    <option value={field} key={field}>
      {FIELDS[field]}
    </option>
  ));

  return (
    <div id="primary-field" className="settings-group">
      <h2 className="sub-title">Primary Field</h2>

      <select
        name="primary-field-select"
        id="primary-field-select"
        defaultValue={props.primaryField}
        onChange={e => props.changeField(e.target.value)}>
        {currencyOptions}
      </select>

      <div className="select-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#eee" viewBox="0 0 24 24">
          <path d={ICON.ARROW} />
        </svg>
      </div>
    </div>
  );
};

export default PrimaryField;
