import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Settings.css';

import Info from './Info';
import Currency from './Currency';
import Budget from './Budget';
import PrimaryField from './Fields/PrimaryField';
import Fields from './Fields/Fields';

import FIELDS from '../../constants/fields';

import { deleteCategory } from '../../store/actions/categories';
import { deleteLocation } from '../../store/actions/locations';
import { deleteSource } from '../../store/actions/sources';

import { updateUserSettings, logout } from '../../store/actions/user';

export class Settings extends Component {
  constructor(props) {
    super(props);
    const { userdata } = this.props.user;

    this.state = { ...userdata };
  }

  componentDidUpdate(prevProps) {
    // Stringify so you can compare the objects.
    // Doesn't work if properties aren't in order.
    const prevUserdata = JSON.stringify(prevProps.user.userdata);
    const currentUserdata = JSON.stringify(this.props.user.userdata);

    if (prevUserdata !== currentUserdata) {
      const { userdata } = this.props.user;

      this.setState({ ...userdata });
    }
  }

  toggleField(field) {
    const toggledValue = !this.state[field];
    const primaryField = this.getNewPrimaryField(field, toggledValue);

    this.setState(
      {
        [field]: toggledValue,
        primaryField
      },
      () => {
        this.handleSave();
      }
    );
  }

  getNewPrimaryField(toggledField, toggledValue) {
    const { primaryField, showCategories, showLocations, showSources } = this.state;

    if (!toggledValue) {
      // Update field toggles locally before pushing to state
      const fields = {
        showCategories,
        showLocations,
        showSources
      };

      fields[toggledField] = toggledValue;

      const newPrimaryField = this.getNextEnabledField(fields);
      return newPrimaryField ? newPrimaryField : primaryField;
    } else {
      return primaryField;
    }
  }

  getNextEnabledField(fields) {
    if (fields.showCategories) return FIELDS.CATEGORIES;
    else if (fields.showLocations) return FIELDS.LOCATIONS;
    else if (fields.showSources) return FIELDS.SOURCES;
    else return null;
  }

  handleSave() {
    this.props.updateUserSettings(this.state);
  }

  render() {
    const { currency, budget, primaryField, showCategories, showLocations, showSources } = this.state;
    const { categories, locations, sources, user } = this.props;

    return (
      <section id="settings">
        <h1 className="title">Settings</h1>

        <Info user={user} logout={() => this.props.logout()} />

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
          deleteCategory={id => this.props.deleteCategory(id)}
          deleteLocation={id => this.props.deleteLocation(id)}
          deleteSource={id => this.props.deleteSource(id)}
          categories={categories}
          locations={locations}
          sources={sources}
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

  updateUserSettings,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
