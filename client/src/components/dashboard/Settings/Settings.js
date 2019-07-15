import React, { Component } from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import Fields from './Fields';

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'USD',
      budget: 500,
      showCategories: true,
      showLocations: true,
      showSources: true
    };
  }

  handleSave = () => {
    this.props.updateUserSettings(this.state);
  }

  render() {
    return (
      <section id="settings">
        <Currency />
        <Budget />
        <Fields {...this.props} />

        <button onClick={() => this.handleSave()} id="save-btn">
          Save Settings
        </button>
      </section>
    );
  }
}

export default Settings;
