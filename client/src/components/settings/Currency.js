import React from 'react';
import CURRENCY from '../../constants/currencies';
import ICONS from '../../constants/icons';
import Icon from '../general/Icon';
import './Currency.css';

const Currency = props => {
  const currencyOptions = Object.keys(CURRENCY).map(currency => (
    <option value={currency} key={currency}>
      {currency}
    </option>
  ));

  return (
    <section id="currency">
      <h2 className="sub-title">Currency</h2>

      <select
        name="currency"
        id="currency"
        value={props.currency}
        onChange={e => props.changeCurrency(e.target.value)}>
        {currencyOptions}
      </select>

      <span className="select-icon">
        <Icon icon={ICONS.ARROW} size={24} fill="#eee" />
      </span>
    </section>
  );
};

export default Currency;
