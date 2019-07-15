import React, { Component } from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import Fields from './Fields';

export class Settings extends Component {
  constructor(props) {
    super(props);
    const userdata = this.props.user.userdata;

    this.state = { ...userdata };
  }

  handleSave() {
    console.log(this.state);
    this.props.updateUserSettings(this.state);
  }

  render() {
    const { currency, budget } = this.state;

    return (
      <section id="settings">
        <Currency
          changeCurrency={newCurrency => {
            this.setState({ currency: newCurrency }, () => 
              this.handleSave()
            );
          }}
          currency={currency}
        />

        <Budget
          changeBudget={newBudget => {
            this.setState({ budget: Number(newBudget) }, () =>
              this.handleSave()
            );
          }}
          budget={budget}
        />

        <Fields {...this.props} />
      </section>
    );
  }
}

export default Settings;
