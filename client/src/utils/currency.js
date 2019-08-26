import CURRENCY from '../constants/currencies';

export const getCurrency = userdata => {
  let currencySymbol = '';

  if (userdata) {
    currencySymbol = CURRENCY[userdata.currency].symbol ? CURRENCY[userdata.currency].symbol : userdata.currency;
  }

  return currencySymbol
}