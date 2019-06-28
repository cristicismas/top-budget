import React from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';

const Settings = () => {
  return (
    <section id="settings">
      <Currency />
      <Budget />
    </section>
  )
}

export default Settings;
