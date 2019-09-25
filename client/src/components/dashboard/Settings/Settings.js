import React, { Component } from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import PrimaryField from './Fields/PrimaryField';
import Fields from './Fields/Fields';

export class Settings extends Component {
  constructor(props) {
    super(props);
    const userdata = this.props.user.userdata;

    this.state = { ...userdata };
  }

  toggleField(field) {
    const currentValue = this.state[field];

    this.setState(
      {
        [field]: !currentValue
      },
      () => {
        this.handleSave();
      }
    );
  }

  handleSave() {
    this.props.updateUserSettings(this.state);
  }

  render() {
    const { currency, budget, primaryField } = this.state;

    return (
      <section id="settings">
        <Currency
          changeCurrency={newCurrency => {
            this.setState({ currency: newCurrency }, () => this.handleSave());
          }}
          currency={currency}
        />

        <Budget
          changeBudget={newBudget => {
            this.setState({ budget: newBudget }, () => this.handleSave());
          }}
          budget={budget}
        />

        <PrimaryField
          changeField={newField => {
            this.setState({ primaryField: newField }, () => this.handleSave());
          }}
          primaryField={primaryField}
        />

        <Fields toggleField={field => this.toggleField(field)} {...this.state} {...this.props} />
      </section>
    );
  }
}

export default Settings;
