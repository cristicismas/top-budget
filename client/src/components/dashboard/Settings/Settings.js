import React, { Component } from 'react';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import Fields from './Fields';

export class Settings extends Component {
  constructor(props) {
    super(props);
    const userdata = this.props.auth.userdata;

    this.state = { ...userdata };
  }

  handleSave() {
    this.props.updateUserSettings(this.state);
  }

  render() {
    const { currency, budget } = this.state;

    return (
      <section id="settings">
        <Currency
          changeCurrency={newCurrency =>
            this.setState({
              currency: newCurrency
            })
          }
          currency={currency}
        />

        <Budget
          changeBudget={newBudget =>
            this.setState({
              budget: Number(newBudget)
            })
          }
          budget={budget}
        />

        <Fields {...this.props} />

        <button onClick={() => this.handleSave()} id="save-btn">
          Save Settings
        </button>
      </section>
    );
  }
}

export default Settings;
