import React from 'react';
import CURRENCY from '../../../constants/currencies';
import ICON from '../../../constants/icons';

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

      <div className="select-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#eee" viewBox="0 0 24 24"><path d={ICON.ARROW}/></svg>
      </div>
    </div>
  );
};

export default Currency;
