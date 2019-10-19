import React from 'react';
import FIELDS from '../../../constants/fields';
import ICONS from '../../../constants/icons';
import Icon from '../../general/Icon';
import './PrimaryField.css';

import { capitalize } from '../../../utils/strings';

const PrimaryField = props => {
  const currencyOptions = Object.keys(FIELDS).map(field => (
    <option value={field} key={field}>
      {capitalize(FIELDS[field])}
    </option>
  ));

  return (
    <section id="primary-field" className="settings-group">
      <h2 className="sub-title">Primary Field</h2>

      <select
        name="primary-field-select"
        id="primary-field-select"
        value={props.primaryField}
        onChange={e => props.changeField(e.target.value)}>
        {currencyOptions}
      </select>

      <span className="select-icon">
        <Icon icon={ICONS.ARROW} size={24} fill="#eee" />
      </span>
    </section>
  );
};

export default PrimaryField;
