import React from 'react';
import CURRENCY from '../../../constants/currencies';

const Currency = () => {
  const currencyOptions = Object.keys(CURRENCY).map(currency => (
    <option value={currency} key={currency}>{currency}</option>
  ));

  return (
    <div id="currency" className="settings-group">
      <h2 className="sub-title">Currency</h2>

      <select name="currency" id="currency">
        {currencyOptions}
      </select>
    </div>
  );
};

export default Currency;
