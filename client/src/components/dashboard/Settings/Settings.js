import React from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import Fields from './Fields';

const Settings = props => {
  return (
    <section id="settings">
      <Currency />
      <Budget />
      <Fields {...props} />
    </section>
  )
}

export default Settings;
