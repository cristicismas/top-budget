import React from 'react';
import CURRENCY from '../../../constants/currencies';

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
    </div>
  );
};

export default Currency;
