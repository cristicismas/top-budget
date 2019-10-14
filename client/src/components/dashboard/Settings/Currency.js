import React from 'react';
import CURRENCY from '../../../constants/currencies';
import ICONS from '../../../constants/icons';
import Icon from '../../general/Icon';
import './Currency.css';

const Currency = props => {
  const currencyOptions = Object.keys(CURRENCY).map(currency => (
    <option value={currency} key={currency}>
      {currency}
    </option>
  ));

  return (
    <div id="currency" className="settings-group">
      <h2 className="sub-title">Currency</h2>

      <select
        name="currency"
        id="currency"
        defaultValue={props.currency}
        onChange={e => props.changeCurrency(e.target.value)}>
        {currencyOptions}
      </select>

      <span className="select-icon">
        <Icon icon={ICONS.ARROW} size={24} fill="#eee" />
      </span>
    </div>
  );
};

export default Currency;
