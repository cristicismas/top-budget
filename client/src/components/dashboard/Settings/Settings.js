import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../css/Settings.css';

import Currency from './Currency';
import Budget from './Budget';
import PrimaryField from './Fields/PrimaryField';
import Fields from './Fields/Fields';

import { deleteCategory } from '../../../store/actions/categories';
import { deleteLocation } from '../../../store/actions/locations';
import { deleteSource } from '../../../store/actions/sources';

import { updateUserSettings } from '../../../store/actions/user';

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
    const { currency, budget, primaryField, showCategories, showLocations, showSources } = this.state;

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

        <Fields
          toggleField={field => this.toggleField(field)}
          showCategories={showCategories}
          showLocations={showLocations}
          showSources={showSources}
          {...this.props}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  expenses: state.expenses,
  categories: state.categories,
  locations: state.locations,
  sources: state.sources
});

const mapDispatchToProps = {
  deleteCategory,
  deleteLocation,
  deleteSource,

  updateUserSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
